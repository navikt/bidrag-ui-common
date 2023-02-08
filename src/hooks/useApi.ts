import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { SecuritySessionUtils } from "../utils";

interface AxiosClient {
    instance: AxiosInstance;
}

export function useApi<T extends AxiosClient>(api: T, app: string, cluster: string): T {
    api.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const secHeaders = await createDefaultHeaders(app, cluster);
            Object.assign(config.headers, secHeaders);

            return config;
        },
        function (error) {
            // error handling here
            return Promise.reject(error);
        }
    );

    api.instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
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
        "Content-type": "application/json; charset=UTF-8",
        "X-Correlation-ID": correlationId,
        "Nav-Call-Id": correlationId,
        "Nav-Consumer-Id": SecuritySessionUtils.getAppName(),
    };
};
