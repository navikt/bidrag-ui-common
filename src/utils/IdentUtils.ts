import ObjectUtils from "./ObjectUtils";

export default class IdentUtils {
    static isFnr(value: string) {
        return this.validateFnr(value);
    }

    static isSamhandlerId(value: string | number) {
        if (ObjectUtils.isEmpty(value)) return false;
        const samhandlerIdentRegex = new RegExp("^[89]\\d{10}$");
        return samhandlerIdentRegex.test(value.toString());
    }

    static isSaksnummer(saksnummer: string | number) {
        return !ObjectUtils.isEmpty(saksnummer) && saksnummer.toString().length === 7;
    }

    static validateFnr(value: string) {
        const elevenDigits = new RegExp("^\\d{11}$");
        return elevenDigits.test(value) && parseInt(value.substring(0, 1)) !== 8;
    }
}
