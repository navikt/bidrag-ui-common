import {CustomError} from "./CustomError";

export default class UserError extends CustomError {
    constructor(message: string) {
        super("UserError", null, message);
    }
}
