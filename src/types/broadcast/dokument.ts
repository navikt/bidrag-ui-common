import { EditDocumentConfig } from "../dokument";

export interface EditDocumentBroadcastMessage {
    document: string;
    config?: EditDocumentConfig;
}
