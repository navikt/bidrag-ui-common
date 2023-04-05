import { BroadcastMessage, PersonBroadcastMessage } from "./types";
import { LogErrorType } from "./types";
declare global {
    interface Window {
        app_name: string;
        appName: string;
        moduleName: string;
        showErrorPage: (error: LogErrorType) => void;
        openPersonsok: () => Window | null;
        waitForPersonSokResult: () => Promise<BroadcastMessage<PersonBroadcastMessage>>;
        countMetric: (name: string, value: string) => void;
        logToServer: {
            info: (message: string) => void;
            warning: (message: string) => void;
            debug: (message: string) => void;
            error: (message: string, err: Error) => void;
        };
    }
}

export default {};
