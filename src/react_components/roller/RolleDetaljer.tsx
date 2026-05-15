import { BodyShort, CopyButton } from "@navikt/ds-react";

import { useBidragCommons } from "../../api/BidragCommonsContext";
import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import PersonNavnIdent from "../person/PersonNavnIdent";
import RolleTag from "./RolleTag";

interface IRolledetaljerProps {
    label?: string;
    rolle: IRolleDetaljer;
    withBorder?: boolean;
    stønad18År?: boolean;
    highlight?: boolean;
}

const RolleDetaljer = ({ rolle, withBorder = true, stønad18År = false }: IRolledetaljerProps) => {
    const { uthevPerson } = useBidragCommons();
    const highlight = uthevPerson?.(rolle.ident, stønad18År) === true;
    console.log("uthevPerson", rolle.ident, stønad18År, uthevPerson?.(rolle.ident, stønad18År));
    return (
        <BodyShort
            as="div"
            size="small"
            className={`px-6 py-1 w-max ${
                withBorder && "border-[var(--a-border-divider)] border-solid border-b"
            } flex items-center ${
                highlight ? "bg-[color-mix(in_srgb,var(--a-surface-selected)_30%,transparent)]" : ""
            }`}
        >
            <RolleTag rolleType={rolle.rolleType} ident={rolle.ident} stønad18År={stønad18År} />
            <PersonNavnIdent ident={rolle.ident} variant="compact" stønad18År={stønad18År} />
            <CopyButton size="small" copyText={rolle.ident} />
        </BodyShort>
    );
};
export default RolleDetaljer;
