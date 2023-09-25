export class StringUtils {
    static isEmpty(str?: string | null): boolean {
        return str == null || !str || str.length === 0;
    }
}
export function removeNonPrintableCharachters(value?: string): string {
    return value?.replace(/\p{C}/gu, "") ?? "";
}
