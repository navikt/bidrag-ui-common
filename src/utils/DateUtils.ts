import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import ObjectUtils from "./ObjectUtils";

dayjs.extend(customParseFormat);

const DATE_FORMATS = ["DDMMYY", "DD.MM.YYYY", "YYYY-MM-DD"];
export const isValidDate = (date: string, formats: string[] | string = DATE_FORMATS) => {
    if (ObjectUtils.isEmpty(date)) {
        return true;
    }

    return dayjs(date, formats, true).isValid();
};

export const isFutureDate = (date: string) => {
    if (!isValidDate(date, DATE_FORMATS)) {
        return false;
    }
    return dayjs(date, DATE_FORMATS, true).isAfter(dayjs(new Date()), "days");
};

export const isAfterDate = (date: string, maxValidDate: string) => {
    if (!isValidDate(date, DATE_FORMATS)) {
        return false;
    }
    return dayjs(date, DATE_FORMATS, true).isAfter(dayjs(maxValidDate, "YYYY-MM-DD"), "days");
};

export const formatDate = (date: string, format = "DD.MM.YYYY") => {
    if (isValidDate(date, DATE_FORMATS) && !ObjectUtils.isEmpty(date)) {
        return dayjs(date, DATE_FORMATS, true).format(format);
    }
    return date;
};
