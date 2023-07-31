import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { LoggerService, SecureLoggerService } from "../../logging";
import { AxiosErrorHandler } from "../../types/error/ErrorHandler";
import { SecuritySessionUtils } from "../../utils";

interface AxiosClient {
    instance: AxiosInstance;
}

export function useApi<T extends AxiosClient>(api: T, app: string, cluster: string): T {
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

        await LoggerService.error(errorMessage, errorInfo);

        const requestBody = config?.data;
        if (requestBody) {
            await SecureLoggerService.error(errorMessage, {
                ...errorInfo,
                stack_trace: `Requesten som førte til feilen inneholdt melding ${requestBody}`,
            });
        }
    }
    api.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const secHeaders = await createDefaultHeaders(app, cluster);
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
const createDefaultHeaders = async (app: string, cluster: string) => {
    const idToken = await SecuritySessionUtils.getSecurityTokenForApp(app, cluster);
    const correlationId = SecuritySessionUtils.getCorrelationId();
    return {
        Authorization: "Bearer " + idToken,
        "X-Correlation-ID": correlationId,
        "Nav-Call-Id": correlationId,
        "Nav-Consumer-Id": SecuritySessionUtils.getAppName(),
    };
};
