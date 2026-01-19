export class StringUtils {
    static isEmpty(str?: string | null): boolean {
        return isStringEmpty(str);
    }
}
export function removeNonPrintableCharachters(value?: string): string {
    return value?.replace(/\p{C}/gu, "") ?? "";
}

export function isStringEmpty(str?: string | null): boolean {
    return str == null || !str || str.length === 0 || str.trim().length === 0;
}

export function capitalize(str?: string | null, capitalizeWords: boolean = true, toLowercase: boolean = true): string {
    if (isStringEmpty(str)) return "";
    if (str?.length == 1) return str;
    const lowercase = toLowercase ? str!.toLocaleLowerCase() : str!;
    if (capitalizeWords) {
        return lowercase
            .split("-")
            .map((word) => capitalize(word, false, false))
            .join("-")
            .split(" ")
            .map((word) => capitalize(word, false, false))
            .join(" ");
    }
    return lowercase?.substring(0, 1).toUpperCase() + lowercase?.substring(1);
}
