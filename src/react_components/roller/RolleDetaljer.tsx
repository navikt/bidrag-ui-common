import { BodyShort } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import React from "react_components";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import { RolleTag } from "./RolleTag";

interface IRolledetaljerProps {
    label?: string;
    rolle: IRolleDetaljer;
    withBorder?: boolean;
}
export const RolleDetaljer = ({ rolle, withBorder = true }: IRolledetaljerProps) => {
    return (
        <BodyShort
            size="small"
            className={`px-6 py-1 ${withBorder && "border-[var(--a-border-divider)] border-solid border-b"
                } flex items-center`}
        >
            <RolleTag rolleType={rolle.rolleType} />
            <span>{rolle.navn}</span>
            <span className="mx-1">/</span> {rolle.ident}
            <CopyToClipboard size="xsmall" copyText={rolle.ident} popoverText="Kopiert til utklippstavlen" />
        </BodyShort>
    );
};
