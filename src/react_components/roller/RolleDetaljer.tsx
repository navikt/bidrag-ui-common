import { BodyShort, CopyButton } from "@navikt/ds-react";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import PersonNavnIdent from "../person/PersonNavnIdent";
import RolleTag from "./RolleTag";

interface IRolledetaljerProps {
    label?: string;
    rolle: IRolleDetaljer;
    withBorder?: boolean;
    stønad18År?: boolean;
}
const RolleDetaljer = ({ rolle, withBorder = true, stønad18År = false }: IRolledetaljerProps) => {
    return (
        <BodyShort
            size="small"
            className={`px-6 py-1 w-max ${
                withBorder && "border-[var(--a-border-divider)] border-solid border-b"
            } flex items-center`}
        >
            <RolleTag rolleType={rolle.rolleType} ident={rolle.ident} stønad18År={stønad18År} />
            <PersonNavnIdent ident={rolle.ident} variant="compact" />
            <CopyButton size="small" copyText={rolle.ident} />
        </BodyShort>
    );
};
export default RolleDetaljer;
