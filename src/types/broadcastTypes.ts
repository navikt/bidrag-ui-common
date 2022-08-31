export interface BroadcastMessage<T> {
    ok: boolean;
    status: number;
    error?: {
        message: string;
        stack?: string;
    };
    payload: T | null;
}
