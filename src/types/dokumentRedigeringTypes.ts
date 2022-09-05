export interface EditDocumentBroadcastMessage {
    document: string;
    config?: EditDocumentConfig;
}

export interface EditDocumentConfig {
    removedPages: number[];
}
