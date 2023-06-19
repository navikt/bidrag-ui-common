import { BodyShort, CopyButton } from "@navikt/ds-react";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
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
            className={`px-6 py-1 ${
                withBorder && "border-[var(--a-border-divider)] border-solid border-b"
            } flex items-center`}
        >
            <RolleTag rolleType={rolle.rolleType} />
            <span>{rolle.navn}</span>
            <span className="mx-1">/</span> {rolle.ident}
            <CopyButton size="small" copyText={rolle.ident} />
        </BodyShort>
    );
};
export default RolleDetaljer;
