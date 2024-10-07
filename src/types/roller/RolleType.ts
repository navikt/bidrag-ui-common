export enum RolleTypeFullName {
    BIDRAGSPLIKTIG = "BIDRAGSPLIKTIG",
    BIDRAGSMOTTAKER = "BIDRAGSMOTTAKER",
    REELMOTTAKER = "REELMOTTAKER",
    BARN = "BARN",
    FEILREGISTRERT = "FEILREGISTRERT",
}

export enum RolleTypeAbbreviation {
    BM = "BM",
    BP = "BP",
    BA = "BA",
    RM = "RM",
    FR = "FR",
}

export enum RolleTypeDeprecated {
    BIDRAGS_PLIKTIG = "BIDRAGS_PLIKTIG",
    BIDRAGS_MOTTAKER = "BIDRAGS_MOTTAKER",
    REELL_MOTTAKER = "REELL_MOTTAKER",
}

export type RolleType = RolleTypeFullName | RolleTypeAbbreviation | RolleTypeDeprecated;
