import { context, propagation } from "@opentelemetry/api";

import { CustomError, IErrorContext } from "../types";
import { ErrorInfo, LogErrorType, LogInfo, LogLevel, LogResponse } from "../types";
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

    static feedback(msg: string): Promise<LogResponse> {
        try {
            return this.mapAndLog(msg, LogLevel.FEEDBACK);
        } catch (e) {
            console.log(e);
            return Promise.resolve({ exceptionCode: "unkown", errorCode: "unkown" });
        }
    }

    static warn(msg: string, error?: LogErrorType | ErrorInfo): Promise<LogResponse> {
        try {
            return this.mapAndLog(msg, LogLevel.WARNING, error);
        } catch (e) {
            console.log(e);
            return Promise.resolve({ exceptionCode: "unkown", errorCode: "unkown" });
        }
    }

    static error(msg: string, error: LogErrorType | ErrorInfo | IErrorContext): Promise<LogResponse> {
        try {
            return this.mapAndLog(msg, LogLevel.ERROR, error);
        } catch (e) {
            console.log(e);
            return Promise.resolve({ exceptionCode: "unkown", errorCode: "unkown" });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected static log(_logInfo: LogInfo, _headers?: Record<string, string>): Promise<LogResponse> {
        throw new Error("Not implemented");
    }

    protected static mapAndLog(message: string, level: LogLevel, error?: LogErrorType | ErrorInfo | IErrorContext) {
        // @ts-ignore
        const parentCtx = window.__otelSessionContext || context.active();
        const carrier: Record<string, string> = {};

        propagation.inject(parentCtx, carrier);
        const logInfo: LogInfo = {
            message,
            level,
            appName: StringUtils.isEmpty(window.appName) ? "bidrag-ui" : window.appName,
            moduleName: StringUtils.isEmpty(window.moduleName) ? "ukjent" : window.moduleName,
            correlationId: SecuritySessionUtils.getCorrelationId(),
        };
        const errorInfo = this.normalizeErrorInfo(error);
        logInfo.error = errorInfo;

        if (errorInfo) {
            // Log on console for easy debugging
            console.error(
                message,
                `Det skjedde en feil: ${errorInfo.message}`,
                `correlationId=${errorInfo.correlationId ?? "unknown"}`,
                errorInfo.stack_trace
            );
        } else {
            console.log(logInfo.message, logInfo);
        }
        return this.log(logInfo, carrier);
    }

    protected static normalizeErrorInfo(error?: LogErrorType | ErrorInfo | IErrorContext): ErrorInfo | undefined {
        if (!error) {
            return undefined;
        }

        if (error instanceof Error) {
            return this.mapError(error);
        }

        const input = error as ErrorInfo &
            IErrorContext & {
                stackTrace?: string;
                componentStack?: string;
            };
        const stackTrace = [input.stack_trace, input.stackTrace, input.stack]
            .filter((value): value is string => Boolean(value?.trim()))
            .join("\n")
            .trim();

        return {
            message: input.message ?? "Unknown error",
            stack_trace: stackTrace || undefined,
            componentStack: input.componentStack,
            errorType: input.errorType ?? input.name ?? "UnknownError",
            cause: input.cause,
            correlationId: input.correlationId ?? null,
            status: input.status,
            exceptionCode: input.exceptionCode,
            errorCode: input.errorCode,
        };
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
