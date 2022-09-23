import { CustomError } from "./error/CustomError";

export enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

export interface LogInfo {
    appName?: string;
    moduleName?: string;
    correlationId?: string;
    level: LogLevel;
    message: string;
    error?: ErrorInfo;
}

export interface ErrorInfo {
    cause?: any;
    correlationId?: string | null;
    stack_trace?: string;
    errorType: string;
    message: string;
    status?: number;
    exceptionCode?: string;
    errorCode?: string;
}

export type LogErrorType = Error | CustomError;

export type LogResponse = ErrorCode;
export interface ErrorCode {
    exceptionCode: string;
    errorCode: string;
}
