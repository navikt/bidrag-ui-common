import { CustomError } from "./CustomError";

export class ApiError extends CustomError {
    public declare status: number;
    // @ts-ignore
    public data: any;
    public ok = false;
    public error?: Error;

    constructor(message: string, stack: string, correlationId?: string, status?: number, error?: Error) {
        super("ApiException", correlationId ?? null, message, stack, error?.cause);
        this.status = status ?? 500;
        this.error = error;
    }
}
