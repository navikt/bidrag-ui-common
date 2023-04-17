import { AxiosError, AxiosResponse } from "axios";

import { SecuritySessionUtils } from "../../utils";
import { ErrorInfo } from "../logging";

export class AxiosErrorHandler {
    static getStackFromErrorBody(errorParsed: object | string): string {
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

        return `Feil fra respons: ${errorParsed}`;
    }

    static async parseResponseBody(response: AxiosResponse): Promise<object | string> {
        const responseText = response.data;
        try {
            return JSON.parse(responseText);
        } catch (e) {
            return responseText;
        }
    }

    static mapErrorResponseToApiError(error: AxiosError): ErrorInfo {
        const response = error.response;
        const stack = error.stack;
        const corrId = error.config?.headers["X-Correlation-ID"];
        const errorInfo = {
            cause: error.code,
            correlationId: corrId ?? SecuritySessionUtils.getCorrelationId(),
            stack_trace: stack,
            errorType: error.name,
            status: error.status,
            message: error.message,
        };
        if (response) {
            const headers = response.headers ?? error.request.headers;
            const errorParsed = AxiosErrorHandler.parseResponseBody(response);
            const correlationId = headers["x-correlation-id"] ?? SecuritySessionUtils.getCorrelationId();
            const warningMessage = headers["Warning"];
            const stackTrace = AxiosErrorHandler.getStackFromErrorBody(errorParsed);
            const errorMessageFromResponse = `${error.message} - ${warningMessage ?? "ukjent feil"}`;

            return {
                ...errorInfo,
                correlationId,
                status: response.status,
                stack_trace: `${stack} - ${stackTrace}`,
                message: errorMessageFromResponse,
            };
        }

        return errorInfo;
    }
}
