import { context, propagation, trace } from "@opentelemetry/api";
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { LoggerService, SecureLoggerService } from "../../logging";
import { AxiosErrorHandler } from "../../types/error/ErrorHandler";
import { SecuritySessionUtils } from "../../utils";
import { tracename } from "./useStartTracing";

interface AxiosClient {
    instance: AxiosInstance;
}

interface UseApiOptions {
    app: string;
    cluster: string;
    env?: string;
    scope?: string;
}

export function useApi<T extends AxiosClient>(api: T, options: UseApiOptions): T {
    const { app, cluster, env, scope } = options;
    const requestStart = performance.now();

    async function logError(error: AxiosError) {
        const config = error.config!;
        const requestUrl = (config?.baseURL ?? "") + (config?.url ?? "");
        const method = config?.method?.toUpperCase();
        const requestEnd = performance.now();
        const requestTime = requestEnd - requestStart;
        const requestInfo = `${method} kall utført til app ${app} på endepunkt=${requestUrl} fra browserurl=${window.location.href} med requestTid=${requestTime}ms`;
        const errorInfo = AxiosErrorHandler.mapErrorResponseToApiError(error);
        const errorMessage = `${error.message} - ${requestInfo}`;

        const status = error?.response?.status ?? 0;
        const warnOrError = status >= 400 && status < 500 ? "warn" : "error";

        await LoggerService[warnOrError](errorMessage, errorInfo);

        const requestBody = config?.data;
        if (requestBody) {
            await SecureLoggerService[warnOrError](`${errorMessage} med melding ${requestBody}`, {
                ...errorInfo,
                stack_trace: `Requesten som førte til feilen inneholdt melding ${requestBody}`,
            });
        }
    }

    api.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const tracer = trace.getTracer(tracename);
            // @ts-ignore
            const parentCtx = window.__otelSessionContext || context.active();
            const apiSpan = tracer.startSpan(config?.baseURL ?? "ukjent", undefined, parentCtx);
            const secHeaders = await createDefaultHeaders(app, cluster, config.baseURL, env, scope);
            const carrier: Record<string, string> = {};
            const sessionContext = trace.setSpan(parentCtx, apiSpan);

            propagation.inject(sessionContext, carrier);

            // Add trace headers to the request
            Object.entries({ ...carrier, ...secHeaders }).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    config.headers[key] = value;
                }
            });
            apiSpan.end();
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
const createDefaultHeaders = async (app: string, cluster: string, baseUrl?: string, env?: string, scope?: string) => {
    let appName = env ? `${app}-${env}` : app;
    const environmentMatch = baseUrl?.match(regexDevEnvironment);
    if (environmentMatch) {
        appName = `${app}${environmentMatch[0]}`;
    }

    const idToken = await SecuritySessionUtils.getSecurityTokenForApp(appName, cluster, scope);
    const traceparent = SecuritySessionUtils.getCorrelationId();
    return {
        Authorization: "Bearer " + idToken,
        "X-Enhet": getEnhet(),
        "X-Correlation-ID": traceparent,
        "Nav-Call-Id": traceparent,
        "Nav-Consumer-Id": SecuritySessionUtils.getAppName(),
    };
};
