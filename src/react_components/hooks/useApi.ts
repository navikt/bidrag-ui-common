import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { LoggerService, SecureLoggerService } from "../../logging";
import { AxiosErrorHandler } from "../../types/error/ErrorHandler";
import { SecuritySessionUtils } from "../../utils";

interface AxiosClient {
    instance: AxiosInstance;
}

export function useApi<T extends AxiosClient>(api: T, app: string, cluster: string, env?: string): T {
    const requestStart = performance.now();

    async function logError(error: AxiosError) {
        const config = error.config!;
        const requestUrl = config.baseURL ?? "" + config?.url ?? "";
        const method = config?.method?.toUpperCase();
        const requestEnd = performance.now();
        const requestTime = requestEnd - requestStart;
        const requestInfo = `${method} kall utført til app ${app} på endepunkt=${requestUrl} fra browserurl=${window.location.href} med requestTid=${requestTime}ms`;
        const errorInfo = AxiosErrorHandler.mapErrorResponseToApiError(error);
        const errorMessage = `${error.message} - ${requestInfo}`;

        const warnOrError = error?.response?.status === 400 ? "warn" : "error";

        await LoggerService[warnOrError](errorMessage, errorInfo);

        const requestBody = config?.data;
        if (requestBody) {
            await SecureLoggerService[warnOrError](errorMessage, {
                ...errorInfo,
                stack_trace: `Requesten som førte til feilen inneholdt melding ${requestBody}`,
            });
        }
    }

    api.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const secHeaders = await createDefaultHeaders(app, cluster, config.baseURL, env);
            Object.assign(config.headers, secHeaders);

            return config;
        },
        async function (error: AxiosError) {
            await logError(error);
            // error handling here
            return Promise.reject(error.stack);
        }
    );

    api.instance.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error: AxiosError) {
            await logError(error);
            return Promise.reject(error);
        }
    );

    return api;
}
const regexDevEnvironment = /-q\d+/; // Regular expression to match 'q' followed by one or more digits at the end of the string

const getEnhet = () => {
    try {
        return new URLSearchParams(window.location.search).get("enhet");
    } catch (error) {
        console.error("Error parsing URL parameters:", error);
        return null;
    }
};
const createDefaultHeaders = async (app: string, cluster: string, baseUrl?: string, env?: string) => {
    let appName = env ? `${app}-${env}` : app;
    const environmentMatch = baseUrl?.match(regexDevEnvironment);
    if (environmentMatch) {
        appName = `${app}${environmentMatch[0]}`;
    }

    const idToken = await SecuritySessionUtils.getSecurityTokenForApp(appName, cluster);
    const traceparent = SecuritySessionUtils.getCorrelationId();
    return {
        Authorization: "Bearer " + idToken,
        "X-Enhet": getEnhet(),
        "X-Correlation-ID": traceparent,
        "Nav-Call-Id": traceparent,
        "Nav-Consumer-Id": SecuritySessionUtils.getAppName(),
        // traceparent: traceparent,
    };
};
