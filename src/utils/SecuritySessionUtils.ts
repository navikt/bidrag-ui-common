import { v4 as uuidV4 } from "uuid";

import { SessionStorage } from "./Storage";

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
        const correlationId = SessionStorage.get("correlationId") ?? `bidrag-dokument-ui/${uuidV4()}`;
        SessionStorage.set("correlationId", correlationId);
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
