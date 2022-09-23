export class CustomError extends Error {
    public correlationId: string | null;
    status = 500;

    constructor(name: string, correlationId: string | null, message: string, stack?: string, cause?: unknown | undefined) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this);
        }
        this.stack = this.stack + "\r\n\r\n" + stack;
        this.correlationId = correlationId;
    }
}
