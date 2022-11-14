export class StringUtils {
    static isEmpty(str?: string | null): boolean {
        return str == null || !str || str.length === 0;
    }
}
