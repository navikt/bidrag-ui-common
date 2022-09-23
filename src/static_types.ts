import {BroadcastMessage, HentPersonResponse} from "./types";
declare global {
    interface Window {
        app_name: string,
        appName: string;
        moduleName: string;
        showErrorPage: (
            stack_trace: string,
            message: string,
            errorType?: string,
            status?: number,
            correlationId?: string
        ) => void;
        openPersonsok: () => Window | null;
        waitForPersonSokResult: () => Promise<BroadcastMessage<HentPersonResponse>>;
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
