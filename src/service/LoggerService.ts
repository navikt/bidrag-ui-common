export class LoggerService {
    static info(msg: string): void {
        try {
            if (window.logToServer) {
                window.logToServer.info(msg);
            }
        } catch (e) {
            console.log(e);
        }
    }

    static warn(msg: string): void {
        try {
            if (window.logToServer) {
                window.logToServer.warning(msg);
            }
        } catch (e) {
            console.log(e);
        }
    }

    static error(msg: string, err: Error): void {
        try {
            if (window.logToServer) {
                window.logToServer.error(msg, err);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
