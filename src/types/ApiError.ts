import { CustomError } from "./CustomError";

export class ApiError extends CustomError {
    public declare status: number;
    // @ts-ignore
    public data: any;
    public ok = false;
    public error?: Error;

    constructor(message: string, stack: string, correlationId: string, status: number, error?: Error) {
        super("ApiException", correlationId, message, stack, error?.cause);
        this.status = status;
        this.error = error;
    }
}
