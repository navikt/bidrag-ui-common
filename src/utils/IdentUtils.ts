import ObjectUtils from "./ObjectUtils";

const elevenGivesZero = (num: number): number => {
    return num === 11 ? 0 : num;
};

const randomDateBetween = (d1: Date, d2: Date): Date => {
    return new Date(d1.getTime() + Math.random() * (d2.getTime() - d1.getTime()));
};

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const randomIndividsiffer = (year: number): number => {
    if (year >= 1854 && year <= 1899) return getRandomInt(500, 749);
    if (year >= 1900 && year <= 1999) return getRandomInt(0, 499);
    if (year >= 2000 && year <= 2039) return getRandomInt(500, 999);

    throw new Error("Unsupported year range");
};

const individsifferAsString = (num: number): string => {
    if (num <= 9) return `00${num}`;
    if (num <= 99) return `0${num}`;
    return `${num}`;
};

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

    static generateFnr(): string {
        const randomDate = randomDateBetween(new Date(1854, 1), new Date());
        const dateISO = randomDate.toISOString();
        const individsiffer = individsifferAsString(randomIndividsiffer(randomDate.getFullYear()));

        const d1 = Number(dateISO.substring(8, 9));
        const d2 = Number(dateISO.substring(9, 10));
        const m1 = Number(dateISO.substring(5, 6));
        const m2 = Number(dateISO.substring(6, 7));
        const aa1 = Number(dateISO.substring(2, 3));
        const aa2 = Number(dateISO.substring(3, 4));

        const i1 = Number(individsiffer.substring(0, 1));
        const i2 = Number(individsiffer.substring(1, 2));
        const i3 = Number(individsiffer.substring(2, 3));

        const k1 = elevenGivesZero(
            11 - ((3 * d1 + 7 * d2 + 6 * m1 + m2 + 8 * aa1 + 9 * aa2 + 4 * i1 + 5 * i2 + 2 * i3) % 11)
        );

        const k2 = elevenGivesZero(
            11 - ((5 * d1 + 4 * d2 + 3 * m1 + 2 * m2 + 7 * aa1 + 6 * aa2 + 5 * i1 + 4 * i2 + 3 * i3 + 2 * k1) % 11)
        );

        const result = `${d1}${d2}${m1}${m2}${aa1}${aa2}${i1}${i2}${i3}${k1}${k2}`;

        return result.length === 11 ? result : IdentUtils.generateFnr();
    }
}
