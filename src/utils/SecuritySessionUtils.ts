import { v4 as uuidV4 } from "uuid";

export class SecuritySessionUtils {
    static async hentSecuritySessionTokenFromBackend() {
        const tokenReq = await fetch("/session", { method: "GET" });
        return (await tokenReq.json()).id_token;
    }

    static async getSecurityTokenForApp(app: string) {
        const tokenReq = await fetch("/token", {
            method: "POST",
            body: JSON.stringify({ app }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        return await tokenReq.text();
    }

    static getCorrelationId(): string {
        const correlationId = LocalStorage.get("correlationId") ?? `bidrag-dokument-ui/${uuidV4()}`;
        LocalStorage.set("correlationId", correlationId);
        return correlationId;
    }
    static async getSession(): Promise<SessionResponse> {
        return {
            user_id: "",
            correlation_id: this.getCorrelationId(),
        };
    }

    static async hentSaksbehandlerId() {
        const tokenReq = await fetch("/me", { method: "GET" });
        return (await tokenReq.json()).navIdent;
    }
}

interface SessionResponse {
    user_id: string;
    correlation_id: string;
}
export class LocalStorage {
    static reset() {
        window.sessionStorage.clear();
    }
    static get(key: string) {
        return window.sessionStorage.getItem(key);
    }

    static set(key: string, value: string) {
        window.sessionStorage.setItem(key, value);
    }
}
