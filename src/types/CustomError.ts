export class CustomError extends Error {
    public correlationId: string;
    status = 500;

    constructor(name: string, correlationId: string, message: string, stack: string, cause: unknown | undefined) {
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
        this.stack = this.stack + "\n" + stack;
        this.correlationId = correlationId;
    }
}
