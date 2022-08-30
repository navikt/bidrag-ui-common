import { v4 as uuidV4 } from "uuid";

import { ApiResponse } from "../types/ApiResponse";
import { LoggerService } from "./LoggerService";
import {SecuritySessionUtils} from "./SecuritySessionUtils";
import {ApiError} from "../types/ApiError";

export interface FetchConfig {
    params?: object;
    headers?: object;
}

type MethodType = "GET" | "POST" | "PUT" | "PATCH";

export class DefaultRestService {
    private readonly app: string;
    private readonly baseUrl: string = "";

    constructor(app: string, baseUrl?: string) {
        this.app = app;
        if (baseUrl) {
            this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
        }
    }

    protected createHeaders(enhet: string): FetchConfig {
        return {
            headers: this.createEnhetHeader(enhet),
        };
    }

    createEnhetHeader(enhet: string) {
        return {
            "X-Enhet": enhet,
        };
    }

    put<T>(url: string, body?: string, config?: FetchConfig): Promise<ApiResponse<T>> {
        return this.fetchResponse(url, "PUT", body, config);
    }

    patch<T>(url: string, body?: string, config?: FetchConfig): Promise<ApiResponse<T>> {
        return this.fetchResponse(url, "PATCH", body, config);
    }

    post<T>(url: string, body?: string, config?: FetchConfig): Promise<ApiResponse<T>> {
        return this.fetchResponse(url, "POST", body, config);
    }

    get<T>(url: string, config?: FetchConfig): Promise<ApiResponse<T>> {
        return this.fetchResponse(url, "GET", undefined, config);
    }

    private async fetchResponse<T>(
        url: string,
        method: MethodType,
        body?: string,
        config?: FetchConfig
    ): Promise<ApiResponse<T>> {
        const headers = await this.createDefaultHeaders();
        return fetch(`${this.baseUrl}${url}`, {
            mode: "cors",
            credentials: this.app == "self" ? "include" : "omit",
            cache: "no-cache",
            body,
            method,
            headers: {
                ...headers,
                ...config?.headers,
            },
        })
            .then(async (response: Response) => {
                if (response.status >= 500) {
                    throw response;
                }
                // Handle 4xx errors on service level
                if (!response.ok) {
                    const responseParsed = await DefaultRestService.parseResponseBody(response);
                    const responseError = typeof responseParsed == "object" ? responseParsed?.error : responseParsed;
                    const warningMessage = response?.headers?.get("Warning") ?? responseParsed.message ?? responseError;
                    LoggerService.warn(`Fikk respons med status ${response.status} og melding ${warningMessage}`);
                    return { ok: false, status: response.status, data: warningMessage } as ApiResponse<T>;
                }
                const responseParsed = await DefaultRestService.parseResponseBody(response);
                return { ok: true, status: response.status, data: responseParsed } as ApiResponse<T>;
            })
            .catch(async (err): Promise<ApiError> => {
                let error: ApiError;
                if (err instanceof Error) {
                    error = DefaultRestService.mapErrorToApiError(err);
                } else {
                    error = await DefaultRestService.mapErrorResponseToApiError(err);
                }
                LoggerService.error(error.message, error);
                throw error;
            });
    }

    private async createDefaultHeaders() {
        const idToken =
            this.app && this.app !== "self" ? await SecuritySessionUtils.getSecurityTokenForApp(this.app) : "";
        const correlationId = SecuritySessionUtils.getCorrelationId();
        return {
            Authorization: "Bearer " + idToken,
            "Content-type": "application/json; charset=UTF-8",
            "X-Correlation-ID": correlationId,
            "Nav-Call-Id": correlationId,
            "Nav-Consumer-Id": window.app_name ?? "bidrasg-ui",
        };
    }

    private static async mapErrorResponseToApiError(error: Response) {
        const errorParsed = await DefaultRestService.parseResponseBody(error);
        const correlationId = error.headers?.get("x-correlation-id") ?? SecuritySessionUtils.getCorrelationId();
        const warningMessage = error?.headers?.get("Warning");
        const stackTrace = errorParsed.stack ?? "Ukjent feil";
        const errorMessageFromResponse = error.statusText + (warningMessage ? " - " + warningMessage : "");
        return new ApiError(errorMessageFromResponse, stackTrace, correlationId, 500);
    }

    private static mapErrorToApiError(error: Error) {
        return new ApiError(error.message, error.stack ?? "", SecuritySessionUtils.getCorrelationId() ?? uuidV4(), 500);
    }

    private static isDocument(response: Response) {
        return response.headers.get("content-type")?.includes("application/pdf");
    }
    private static async parseResponseBody(response: Response): Promise<any | string> {
        if (DefaultRestService.isDocument(response)) {
            return await response.blob();
        }
        const responseText = await response.text();
        try {
            return JSON.parse(responseText);
        } catch (e) {
            return responseText;
        }
    }
}
