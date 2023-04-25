import { StringUtils } from "./StringUtils";

export default class ObjectUtils {
    static isEmpty(value?: any) {
        if (!value) {
            return true;
        }

        if (value && typeof value === "string") {
            return StringUtils.isEmpty(value);
        }
        return Object.keys(value).length === 0;
    }
}
