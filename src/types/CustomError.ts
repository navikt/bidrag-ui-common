export class CustomError extends Error {
    public correlationId: string;
    status = 500;

    constructor(name: string, correlationId: string, message: string, stack: string) {
        super();
        this.name = name;
        this.message = message;

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
