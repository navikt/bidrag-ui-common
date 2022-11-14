import { LogInfo } from "../types";
import { LogErrorType } from "../types";
import { ErrorInfo } from "../types";
import { CustomError } from "../types";
import { LogLevel } from "../types";
import { LogResponse } from "../types";
import { SecuritySessionUtils } from "../utils";
import { StringUtils } from "../utils/StringUtils";

export abstract class AbstractLoggerService {
    static info(msg: string): Promise<LogResponse> {
        try {
            return this.mapAndLog(msg, LogLevel.INFO);
        } catch (e) {
            console.log(e);
            return Promise.resolve({ exceptionCode: "unkown", errorCode: "unkown" });
        }
    }

    static warn(msg: string): Promise<LogResponse> {
        try {
            return this.mapAndLog(msg, LogLevel.WARNING);
        } catch (e) {
            console.log(e);
            return Promise.resolve({ exceptionCode: "unkown", errorCode: "unkown" });
        }
    }

    static error(msg: string, error: LogErrorType): Promise<LogResponse> {
        try {
            return this.mapAndLog(msg, LogLevel.ERROR, error);
        } catch (e) {
            console.log(e);
            return Promise.resolve({ exceptionCode: "unkown", errorCode: "unkown" });
        }
    }

    protected static log(logInfo: LogInfo): Promise<LogResponse> {
        throw new Error("Not implemented");
    }

    protected static mapAndLog(message: string, level: LogLevel, error?: LogErrorType) {
        const logInfo: LogInfo = {
            message,
            level,
            appName: StringUtils.isEmpty(window.appName) ? "bidrag-ui" : window.appName,
            moduleName: StringUtils.isEmpty(window.moduleName) ? "ukjent" : window.moduleName,
            correlationId: SecuritySessionUtils.getCorrelationId(),
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

    protected static mapError(error?: LogErrorType): ErrorInfo | undefined {
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
