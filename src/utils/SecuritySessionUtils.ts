import { v4 as uuidV4 } from "uuid";

import { SessionStorage } from "./Storage";

export class SecuritySessionUtils {
    static async hentSecuritySessionTokenFromBackend() {
        const tokenReq = await fetch("/session", { method: "GET" });
        return (await tokenReq.json()).id_token;
    }

    static async isLoggedIn(): Promise<boolean> {
        return fetch("/me", { method: "GET" })
            .then((res) => res.status == 200)
            .catch(() => false);
    }

    static async getSecurityTokenForApp(app: string, cluster?: string) {
        const tokenReq = await fetch("/token", {
            method: "POST",
            body: JSON.stringify({ app, cluster }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        return await tokenReq.text();
    }

    static getCorrelationId(): string {
        return SessionStorage.getOrDefault("correlationId", `${this.getAppName()}/${uuidV4()}`);
    }

    static getAppModuleName() {
        if (window.appName) {
            return `${window.appName}/${window.moduleName ?? "ukjent"}`;
        }
        return "bidrag-ui";
    }

    static getAppName() {
        return window.appName ?? "bidrag-ui";
    }

    static async getSession(): Promise<SessionResponse> {
        return {
            user_id: "",
            correlation_id: this.getCorrelationId(),
        };
    }

    static async hentSaksbehandlerNavn(): Promise<string | undefined> {
        const tokenReq = await fetch("/me", { method: "GET" });
        return (await tokenReq.json()).displayName;
    }
    static async hentSaksbehandlerId(): Promise<string | undefined> {
        const tokenReq = await fetch("/me", { method: "GET" });
        return (await tokenReq.json()).navIdent;
    }
}

interface SessionResponse {
    user_id: string;
    correlation_id: string;
}
