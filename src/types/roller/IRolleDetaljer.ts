import { RolleType } from "./RolleType";

export interface IRolleDetaljer {
    rolleType: RolleType;
    navn: string;
    ident: string;
    stønad18År?: boolean;
}
