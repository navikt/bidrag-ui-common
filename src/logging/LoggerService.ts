import { AbstractLoggerService } from "../service/AbstractLoggerService";
import { LogInfo } from "../types";
import { LogResponse } from "../types";

export class LoggerService extends AbstractLoggerService {
    static override log(logInfo: LogInfo, headers?: Record<string, string>): Promise<LogResponse> {
        return fetch("/log", {
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(logInfo),
            method: "POST",
            headers: {
                ...headers,
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .catch(console.log);
    }
}
