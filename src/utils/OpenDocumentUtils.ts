import { LoggerService } from "../logging";
import { EditDocumentBroadcastMessage, EditDocumentConfig, EditorConfigStorage } from "../types";

export class OpenDocumentUtils {
    static åpneDokument(
        journalpostid: string,
        dokumentreferanse?: string,
        optimizeForPrint?: boolean,
        openInNewWindow = false
    ) {
        window.open(
            OpenDocumentUtils.getÅpneDokumentLenke(journalpostid, dokumentreferanse, optimizeForPrint, openInNewWindow)
        );
    }

    static getÅpneDokumentLenke(
        journalpostid: string,
        dokumentreferanse?: string,
        optimizeForPrint?: boolean,
        openInNewWindow = false
    ): string {
        const opimizeForPrintQuery = optimizeForPrint != null ? `&optimizeForPrint=${optimizeForPrint}` : "";
        const openInNewWindowQuery = `openInNewWindow=${openInNewWindow ? "true" : "false"}`;
        const dokumentReferanseParam = dokumentreferanse ? "/" + dokumentreferanse : "";
        return `/aapnedokument/${journalpostid}${dokumentReferanseParam}?${openInNewWindowQuery}${opimizeForPrintQuery}`;
    }

    static åpneDokumenter(dokumenter: string[], openInNewWindow = false) {
        window.open(OpenDocumentUtils.getÅpneDokumenterLenke(dokumenter, openInNewWindow));
    }

    static getÅpneDokumenterLenke(dokumenter: string[], openInNewWindow = false) {
        const openInNewWindowQuery = `openInNewWindow=${openInNewWindow ? "true" : "false"}`;
        return `/aapnedokument?${dokumenter.map((d) => `dokument=${d}`).join("&")}&${openInNewWindowQuery}`;
    }

    static openDocumentEditorWithDocuments(dokumenter: string[], editDocumentConfig?: EditDocumentConfig, id?: string) {
        LoggerService.info(`Åpner dokumenter ${dokumenter} på nettleser`);
        const dokumenterPath = dokumenter.map((dokument) => `dokument=${dokument}`).join("&");
        if (id && editDocumentConfig) {
            EditorConfigStorage.save(id, editDocumentConfig);
        }
        window.open(`/rediger/?${dokumenterPath}&id=${id}`);
    }

    static openDocumentEditor(journalpostId: string, editDocumentConfig?: EditDocumentConfig, id?: string) {
        LoggerService.info(`Åpner dokument ${journalpostId} på nettleser`);
        if (id && editDocumentConfig) {
            EditorConfigStorage.save(id, editDocumentConfig);
        }
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
        if (id && editedDocument) {
            EditorConfigStorage.save(id, editedDocument?.config);
        }
        window.open(`/rediger/masker/${forsendelseId}/${dokumentreferanse}?id=${id}`);
    }
}
