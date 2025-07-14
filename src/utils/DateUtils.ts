export const dateToDDMMYYYYString = (date: Date) =>
    date.toLocaleDateString("nb-NO", { year: "numeric", month: "2-digit", day: "2-digit" });
export const ISODateTimeStringToDDMMYYYYString = (isoDateTimeString?: string) => {
    if (!isoDateTimeString) return "";
    const date = new Date(isoDateTimeString);
    return isValidDate(date) ? dateToDDMMYYYYString(date) : "";
};

export const toISODateString = (date: Date): string =>
    date.toLocaleDateString("sv-SV", { year: "numeric", month: "2-digit", day: "2-digit" });
export const toISODateTimeString = (date?: Date): string | null =>
    date == undefined
        ? null
        : date?.toLocaleDateString("sv-SV", { year: "numeric", month: "2-digit", day: "2-digit" }) +
          "T" +
          date?.toLocaleTimeString() +
          "Z";
export const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};
export const deductDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
};
export const lastDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const isValidDate = (date: any) => date && date instanceof Date && isFinite(date.getTime());
export const isFirstDayOfMonth = (date: Date) => firstDayOfMonth(date).getDate() === date.getDate();
export const isLastDayOfMonth = (date: Date) => lastDayOfMonth(date).getDate() === date.getDate();
export const isAfterDate = (date: string, maxValidate: string) => {
    if (!isValidDate(new Date(date))) {
        return false;
    }
    return new Date(date) > new Date(maxValidate);
};
export const isFutureDate = (date: string) => isAfterDate(date, toISODateString(new Date()));
