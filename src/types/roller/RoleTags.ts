import { RolleType } from "./RolleType";

export const ROLE_TAGS = {
    [RolleType.BM]: "success",
    [RolleType.BP]: "warning",
    [RolleType.BA]: "alt1",
    [RolleType.RM]: "alt3",
    [RolleType.FR]: "error",
} as const;
