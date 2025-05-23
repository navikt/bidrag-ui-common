import { v4 as uuidV4 } from "uuid";

import { LoggerService } from "../logging/LoggerService";
import { SecureLoggerService } from "../logging/SecureLoggerService";
import { ApiError, SimpleError } from "../types";
import { ApiResponse } from "../types";
import { SecuritySessionUtils } from "../utils";

export interface FetchConfig {
    params?: object;
    headers?: object;
}

type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "OPTIONS";

export class DefaultRestService {
    private readonly app: string;
    private readonly cluster: string;
    private readonly baseUrl: string = "";
    private readonly env?: string;

    constructor(app: string, baseUrl?: string, gcpApp?: boolean, env?: string) {
        this.app = app;
        this.env = env;
        this.cluster = gcpApp ? "gcp" : "fss";
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

    options<T>(url: string, config?: FetchConfig): Promise<ApiResponse<T>> {
        return this.fetchResponse(url, "OPTIONS", undefined, config);
    }

    private async fetchResponse<T>(
        url: string,
        method: MethodType,
        body?: string,
        config?: FetchConfig
    ): Promise<ApiResponse<T>> {
        const headers = await this.createDefaultHeaders();
        const requestStart = performance.now();
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
                    LoggerService.warn(
                        `Fikk respons med status ${response.status} og melding ${warningMessage} fra endepunkt ${this.baseUrl}${url}`
                    );
                    return { ok: false, status: response.status, data: warningMessage } as ApiResponse<T>;
                }
                const responseParsed = await DefaultRestService.parseResponseBody(response);
                return { ok: true, status: response.status, data: responseParsed } as ApiResponse<T>;
            })
            .catch(async (err): Promise<ApiError> => {
                let error: ApiError;
                const requestEnd = performance.now();
                const requestTime = requestEnd - requestStart;
                const requestInfo = `${method} kall utført til endepunkt=${this.baseUrl}${url} fra browserurl=${window.location.href} med requestTid=${requestTime}ms`;
                if (err instanceof Error) {
                    error = DefaultRestService.mapErrorToApiError(err);
                } else {
                    error = await DefaultRestService.mapErrorResponseToApiError(err);
                }
                const errorMessage = `${error.message} - ${requestInfo}`;

                if (err instanceof TypeError) {
                    LoggerService.warn("TypeError: " + errorMessage, error);
                } else {
                    LoggerService.error(errorMessage, error);
                }

                if (body) {
                    SecureLoggerService.error(
                        errorMessage,
                        new SimpleError(`Requesten som førte til feilen inneholdt melding ${body}`)
                    );
                }

                throw error;
            });
    }

    private async createDefaultHeaders() {
        const regexDevEnvironment = /-q\d+/;
        let appName = this.env ? `${this.app}-${this.env}` : this.app;
        const environmentMatch = this.baseUrl?.match(regexDevEnvironment);
        if (environmentMatch) {
            appName = `${this.app}${environmentMatch[0]}`;
        }

        const idToken =
            this.app && this.app !== "self"
                ? await SecuritySessionUtils.getSecurityTokenForApp(appName, this.cluster)
                : "";
        const correlationId = SecuritySessionUtils.getCorrelationId();
        return {
            Authorization: "Bearer " + idToken,
            "Content-type": "application/json; charset=UTF-8",
            "X-Correlation-ID": correlationId,
            "Nav-Call-Id": correlationId,
            "Nav-Consumer-Id": SecuritySessionUtils.getAppName(),
        };
    }

    private static async mapErrorResponseToApiError(error: Response) {
        const errorParsed = await DefaultRestService.parseResponseBody(error);
        const correlationId = error.headers?.get("x-correlation-id") ?? SecuritySessionUtils.getCorrelationId();
        const warningMessage = error?.headers?.get("Warning");
        const stackTrace = this.getStackFromErrorBody(errorParsed);
        const errorMessageFromResponse = `${warningMessage ?? "ukjent feil"} - status=${error.statusText}(${
            error.status
        })`;

        return new ApiError(errorMessageFromResponse, stackTrace, correlationId, 500, undefined);
    }

    private static getStackFromErrorBody(errorParsed: object | string): string {
        if (errorParsed && typeof errorParsed == "string") {
            return errorParsed;
        }
        if (errorParsed && typeof errorParsed == "object") {
            return (
                Object.keys(errorParsed)
                    // @ts-ignore
                    .map((key) => `key=${errorParsed[key]}`)
                    .join("-")
            );
        }

        return "ukjent feil";
    }

    private static mapErrorToApiError(error: Error) {
        return new ApiError(
            error.message,
            error.stack ?? "",
            SecuritySessionUtils.getCorrelationId() ?? uuidV4(),
            500,
            error
        );
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
        } catch {
            return responseText;
        }
    }
}
