import { CopyButton } from "@navikt/ds-react";

import { useBidragCommons } from "../../api/BidragCommonsContext";
import { IRolleDetaljer, RolleTypeAbbreviation } from "../../types";
import PersonNavnIdent from "../person/PersonNavnIdent";
import RolleTag from "./RolleTag";

interface IRolledetaljerProps {
    label?: string;
    rolle: IRolleDetaljer;
    withBorder?: boolean;
    stønad18År?: boolean;
    highlight?: boolean;
}

const RolleCard = ({ rolle, stønad18År = false }: IRolledetaljerProps) => {
    const { uthevPerson } = useBidragCommons();
    const highlight = uthevPerson?.(rolle.ident, rolle.stønad18År) === true;
    return (
        <div
            className={`rounded border border-[var(--a-border-subtle)] px-2 py-1.5 min-w-[220px] ${
                highlight
                    ? "bg-[color-mix(in_srgb,var(--a-surface-selected)_80%,transparent)]"
                    : "bg-[var(--a-surface-default)]"
            }`}
        >
            <div className="flex gap-2 items-center">
                <RolleTag
                    rolleType={rolle.rolleType as unknown as RolleTypeAbbreviation}
                    ident={rolle.ident}
                    stønad18År={rolle.stønad18År}
                />
                <PersonNavnIdent ident={rolle.ident} variant="navnIdent" stønad18År={rolle.stønad18År} />
                <CopyButton size="small" copyText={rolle.ident} />
            </div>
        </div>
    );
};

export default RolleCard;
