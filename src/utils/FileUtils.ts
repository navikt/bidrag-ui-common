export type FileData = ArrayBuffer | Blob | Uint8Array | string;

export class FileUtils {
    static dataToFileUrl(data: FileData, type: string): string {
        const fileBlob = new Blob([data], { type: type });
        return URL.createObjectURL(fileBlob);
    }

    static openFile(data: FileData, openInNewWindow = true): void {
        const fileURL = this.dataToFileUrl(data, "application/pdf");
        this.openFileUrl(fileURL, openInNewWindow);
    }

    static async openFileUrl(fileURL?: string, openInNewWindow = false): Promise<void> {
        if (!fileURL) {
            return;
        }
        const result = window.open(fileURL, openInNewWindow ? "_blank" : "_self");
        if (result === null) {
            alert("Kunne ikke åpne fil. Vennligst gi tillatelse til å åpne popup vindu");
        }
    }

    static _base64ToArrayBuffer(base64: string) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}
