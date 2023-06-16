import { SessionStorage } from "../../utils";

interface IDokumentType {
    dokumentreferanse?: string;
}
export function dokumenterToString(journalpostId: string, dokumenter?: IDokumentType[]) {
    return dokumenter?.map((dokument) => dokumentToString(journalpostId, dokument));
}

export function dokumentToString(journalpostId: string, dokument: IDokumentType) {
    return `${journalpostId}:${dokument.dokumentreferanse}`;
}

export type EditDocumentConfig = string;
export class EditorConfigStorage {
    private static getKey = (id: string) => `editor_config_${id}`;
    private static stringify<T>(object: T): string {
        if (typeof object == "string") return object;
        if (typeof object == "object") return JSON.stringify(object);
        return object as string;
    }
    static save<T>(id: string, config: T) {
        SessionStorage.set(this.getKey(id), this.stringify(config));
    }

    static get<T>(id: string): T | null {
        const configString = SessionStorage.get(this.getKey(id));
        return configString ? JSON.parse(configString) : null;
    }
}
