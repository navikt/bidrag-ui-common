import { SessionStorage } from "../utils";

export interface EditDocumentBroadcastMessage {
    document: string;
    config?: EditDocumentConfig;
}

export interface EditDocumentConfig {
    removedPages: number[];
}

export class EditorConfigStorage {
    private static getKey = (id: string) => `editor_config_${id}`;
    static save(id: string, config: EditDocumentConfig) {
        SessionStorage.set(this.getKey(id), JSON.stringify(config));
    }

    static get(id: string): EditDocumentConfig | null {
        const configString = SessionStorage.get(this.getKey(id));
        return configString ? JSON.parse(configString) : null;
    }
}
