import { CustomError, SimpleError } from "../error";

export enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    FEEDBACK = "FEEDBACK",
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
/** Context shape logged when an Axios error occurs. */
export interface IErrorContext {
    url?: string;
    method?: string | undefined;
    status: number;
    statusText?: string | undefined;
    requestHeaders?: Record<string, unknown> | undefined;
    responseData?: unknown;
    responseHeaders?: Record<string, unknown> | undefined;
    stack?: string | undefined;
    stack_trace?: string;
    stackTrace?: string;
    componentStack?: string;
    message: string;
    correlationId: string | null;
    name: string;
    errorType?: string;
    timestamp: string;
}

export interface AxiosErrorContext {
    cause?: any;
    correlationId?: string | null;
    stack_trace?: string;
    errorType: string;
    message: string;
    status?: number;
    exceptionCode?: string;
    errorCode?: string;
}
export interface ErrorInfo {
    cause?: any;
    correlationId?: string | null;
    stack_trace?: string;
    stack?: string;
    stackTrace?: string;
    componentStack?: string;
    errorType: string;
    message: string;
    status?: number;
    exceptionCode?: string;
    errorCode?: string;
}

export type LogErrorType = Error | CustomError | SimpleError;

export type LogResponse = ErrorCode;
export interface ErrorCode {
    exceptionCode: string;
    errorCode: string;
}
