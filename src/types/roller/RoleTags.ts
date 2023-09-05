import { RolleType } from "./RolleType";

export const ROLE_TAGS = {
    [RolleType.BM]: "success",
    [RolleType.BP]: "warning",
    [RolleType.BA]: "alt1",
    [RolleType.RM]: "alt3",
    [RolleType.FR]: "error",

    [RolleType.BIDRAGSMOTTAKER]: "success",
    [RolleType.BIDRAGSPLIKTIG]: "warning",
    [RolleType.BARN]: "alt1",
    [RolleType.REELMOTTAKER]: "alt3",
    [RolleType.FEILREGISTRERT]: "error",

    [RolleType.BIDRAGS_MOTTAKER]: "success",
    [RolleType.BIDRAGS_PLIKTIG]: "warning",
    [RolleType.REELL_MOTTAKER]: "alt3",
} as const;
export const ROLE_FORKORTELSER = {
    [RolleType.BIDRAGSMOTTAKER]: "BM",
    [RolleType.BIDRAGSPLIKTIG]: "BP",
    [RolleType.BARN]: "BA",
    [RolleType.REELMOTTAKER]: "RM",
    [RolleType.FEILREGISTRERT]: "FR",

    [RolleType.BIDRAGS_MOTTAKER]: "BM",
    [RolleType.BIDRAGS_PLIKTIG]: "BP",
    [RolleType.REELL_MOTTAKER]: "RM",
} as const;
