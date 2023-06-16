import { RolleType } from "./RolleType";

export const ROLE_TAGS = {
    [RolleType.BM]: "success",
    [RolleType.BP]: "warning",
    [RolleType.BA]: "alt1",
    [RolleType.RM]: "alt3",
    [RolleType.FR]: "error",

    [RolleType.BIDRAGS_MOTTAKER]: "success",
    [RolleType.BIDRAGS_PLIKTIG]: "warning",
    [RolleType.BARN]: "alt1",
    [RolleType.REELL_MOTTAKER]: "alt3",
    [RolleType.FEILREGISTRERT]: "error",
} as const;
