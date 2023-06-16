import { EditDocumentConfig } from "../dokument";

export interface EditDocumentBroadcastMessage {
    documentFile?: string;
    /**
     * @deprecated Use documentFile instead
     */
    document: string;
    config?: EditDocumentConfig;
}
