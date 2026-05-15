import { RolleType } from "./RolleType";

export interface IRolleDetaljer {
    id?: number;
    rolleType: RolleType;
    navn: string;
    ident: string;
    stønad18År?: boolean;
    saksnummer?: string;
    bidragsmottaker?: string;
}
