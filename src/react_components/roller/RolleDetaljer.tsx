import { BodyShort, CopyButton } from "@navikt/ds-react";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import PersonNavnIdent from "../person/PersonNavnIdent";
import RolleTag from "./RolleTag";

interface IRolledetaljerProps {
    label?: string;
    rolle: IRolleDetaljer;
    withBorder?: boolean;
}
const RolleDetaljer = ({ rolle, withBorder = true }: IRolledetaljerProps) => {
    return (
        <BodyShort
            size="small"
            className={`px-6 py-1 w-max ${withBorder && "border-[var(--a-border-divider)] border-solid border-b"
                } flex items-center`}
        >
            <RolleTag rolleType={rolle.rolleType} />
            <PersonNavnIdent ident={rolle.ident} variant="compact" />
            <CopyButton size="small" copyText={rolle.ident} />
        </BodyShort>
    );
};
export default RolleDetaljer;
