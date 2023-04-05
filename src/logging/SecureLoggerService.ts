import { AbstractLoggerService } from "../service/AbstractLoggerService";
import { LogInfo } from "../types";
import { LogResponse } from "../types";

export class SecureLoggerService extends AbstractLoggerService {
    static override log(logInfo: LogInfo): Promise<LogResponse> {
        return fetch("/log/secure", {
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(logInfo),
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .catch(console.log);
    }
}
