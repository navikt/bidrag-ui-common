import { LoggerService } from "../logging";
import { EditDocumentBroadcastMessage, EditDocumentConfig, EditorConfigStorage } from "../types";

export class OpenDocumentUtils {
    static åpneDokument(journalpostid: string, dokumentreferanse?: string) {
        window.open(
            `/aapnedokument/${journalpostid}${dokumentreferanse ? "/" + dokumentreferanse : ""}?openInNewWindow=false`
        );
    }

    static åpneDokumenter(dokumenter: string[]) {
        window.open(`/aapnedokument?${dokumenter.map((d) => `dokument=${d}`).join("&")}&openInNewWindow=false`);
    }

    static openDocumentEditorWithDocuments(dokumenter: string[], editDocumentConfig?: EditDocumentConfig, id?: string) {
        LoggerService.info(`Åpner dokumenter ${dokumenter} på nettleser`);
        const dokumenterPath = dokumenter.map((dokument) => `dokument=${dokument}`).join("&");
        id && editDocumentConfig && EditorConfigStorage.save(id, editDocumentConfig);
        window.open(`/rediger/?${dokumenterPath}&id=${id}`);
    }

    static openDocumentEditor(journalpostId: string, editDocumentConfig?: EditDocumentConfig, id?: string) {
        LoggerService.info(`Åpner dokument ${journalpostId} på nettleser`);
        id && editDocumentConfig && EditorConfigStorage.save(id, editDocumentConfig);
        window.open(`/rediger/${journalpostId}?id=${id}`);
    }

    static openDocumentMaskingEditor(
        forsendelseId: string,
        dokumentreferanse: string,
        editedDocument?: EditDocumentBroadcastMessage,
        id?: string
    ) {
        LoggerService.info(
            `Åpner redigering av forsendelse ${forsendelseId} og dokument ${dokumentreferanse} på nettleser`
        );
        id && editedDocument && EditorConfigStorage.save(id, editedDocument?.config);
        window.open(`/rediger/masker/${forsendelseId}/${dokumentreferanse}?id=${id}`);
    }
}
