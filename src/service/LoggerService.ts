import { CustomError } from "../types";
import { ErrorInfo, LogErrorType, LogInfo, LogLevel } from "../types";
import { LogResponse } from "../types";

export class LoggerService {
    static info(msg: string): void {
        try {
            this.mapAndLog(msg, LogLevel.INFO);
        } catch (e) {
            console.log(e);
        }
    }

    static warn(msg: string): void {
        try {
            this.mapAndLog(msg, LogLevel.WARNING);
        } catch (e) {
            console.log(e);
        }
    }

    static error(msg: string, error: LogErrorType): void {
        try {
            this.mapAndLog(msg, LogLevel.ERROR, error);
        } catch (e) {
            console.log(e);
        }
    }

    private static mapAndLog(message: string, level: LogLevel, error?: LogErrorType) {
        const logInfo: LogInfo = {
            message,
            level,
            appName: window.appName ?? "bidrag-ui",
            moduleName: window.moduleName ?? "ukjent",
        };
        const errorInfo = this.mapError(error);
        logInfo.error = errorInfo;

        if (errorInfo) {
            // Log on console for easy debugging
            console.error(
                `Det skjedde en feil: ${errorInfo.message}`,
                `correlationId=${errorInfo.correlationId}`,
                errorInfo.stack_trace
            );
        } else {
            console.log(logInfo.message, logInfo);
        }
        return this.log(logInfo);
    }

    static log(logInfo: LogInfo): Promise<LogResponse> {
        return fetch("/log", {
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(logInfo),
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .catch(console.log);
    }

    private static mapError(error?: LogErrorType): ErrorInfo | undefined {
        if (!error) {
            return;
        }

        let errorInfo: ErrorInfo = {
            message: error.message,
            stack_trace: error.stack,
            errorType: error.name,
            cause: error.cause,
        };

        if (error instanceof CustomError) {
            errorInfo = {
                ...errorInfo,
                correlationId: error.correlationId,
                status: error.status,
            };
        }

        return errorInfo;
    }
}
