export class SimpleError extends Error {
    constructor(message: string) {
        super();
        this.name = "SimpleError";
        this.stack = message;
    }
}
