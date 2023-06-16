export const dateToDDMMYYYYString = (date: Date) =>
    date.toLocaleDateString("nb-NO", { year: "numeric", month: "2-digit", day: "2-digit" });
export const toISODateString = (date: Date): string =>
    date.toLocaleDateString("sv-SV", { year: "numeric", month: "2-digit", day: "2-digit" });
export const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};
export const deductDays = (date: Date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
};
export const lastDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const isValidDate = (date: any) => date && date instanceof Date && isFinite(date.getTime());
export const isFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDate() === date.getDate();
};
export const isLastDayOfMonth = (date: Date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.getDate() === date.getDate();
};
export const isAfterDate = (date: string, maxValidate: string) => {
    if (!isValidDate(new Date(date))) {
        return false;
    }
    return new Date(date) > new Date(maxValidate);
};
export const isFutureDate = (date: string) => isAfterDate(date, toISODateString(new Date()));
