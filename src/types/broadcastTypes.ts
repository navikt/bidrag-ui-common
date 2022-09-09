export interface BroadcastError {
    message: string;
    stack?: string;
}
export interface BroadcastMessage<T> {
    ok?: boolean; // deprecated
    status?: number; // deprecated
    id: string;
    error?: BroadcastError | T;
    payload: T | null;
}

export class Broadcast {
    static convertToBroadcastMessage<T>(id: string, payload: T): BroadcastMessage<T> {
        return {
            id,
            payload,
        };
    }

    static convertToBroadcastErrorMessage<T>(id: string, error: T | string): BroadcastMessage<T> {
        return {
            id,
            error: typeof error == "string" ? { message: error } : error,
            payload: null,
        };
    }

    static sendBroadcast<T>(name: string, data: BroadcastMessage<T>): void {
        const bc = new BroadcastChannel(name);
        bc.postMessage(JSON.stringify(data));
        bc.close();
    }

    static waitForBroadcast<T>(name: string, id?: string): Promise<BroadcastMessage<T>> {
        return new Promise((resolve, reject) => {
            function onResult(obj: MessageEvent<string>): void {
                const data = JSON.parse(obj.data) as BroadcastMessage<T>
                if (!id || data.id === id){
                    resolve(data);
                    bc.close();
                }

            }
            const bc = new BroadcastChannel(name);
            bc.onmessage = onResult;
            bc.onmessageerror = (ev: MessageEvent) => reject(ev);
        });
    }
}

export enum BroadcastNames {
    EDIT_DOCUMENT_RESULT = "EDIT_DOCUMENT_RESULT",
    EDIT_DOCUMENT_CONFIG = "EDIT_DOCUMENT_CONFIG",
}
