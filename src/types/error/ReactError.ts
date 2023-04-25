import { CustomError } from "./CustomError";

export default class ReactError extends CustomError {
    constructor(message: string, stack: string, correlationId: string) {
        super("ReactException", correlationId, message, stack);
    }
}
