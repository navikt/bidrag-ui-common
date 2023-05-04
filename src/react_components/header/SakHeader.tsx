import { BodyShort } from "@navikt/ds-react";
import { Cell } from "@navikt/ds-react";
import { Grid } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import React from "react_components";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import { RolleType } from "../../types/roller/RolleType";
import { RolleDetaljer } from "../roller/RolleDetaljer";

interface ISkjermbildeDetaljer {
    navn: string;
    referanse: string;
}
interface ISakHeaderProps {
    saksnummer: string;
    roller: IRolleDetaljer[];
    skjermbilde?: ISkjermbildeDetaljer;
}
export default function SakHeader({ saksnummer, roller, skjermbilde }: ISakHeaderProps) {
    return (
        <div className="bg-[var(--a-gray-50)] border-[var(--a-border-divider)] border-solid border-b w-full border-0">
            {/** @ts-ignore **/}
            <div className="px-6 py-1 flex items-center border-[var(--a-border-divider)] border-solid border-b border-0">
                <SkjermbildeDetaljer saksnummer={saksnummer} skjermbilde={skjermbilde} />
            </div>
            <Grid className={"max-w-5xl"}>
                <Cell xs={12} sm={10} md={9} lg={6}>
                    {roller
                        ?.filter((r) => r.rolleType != RolleType.BA)
                        .map((rolle, i) => (
                            <RolleDetaljer key={rolle.ident + i} rolle={rolle} withBorder={false} />
                        ))}
                </Cell>
                <Cell xs={12} md={10} lg={6}>
                    {roller
                        ?.filter((r) => r.rolleType == RolleType.BA)
                        .map((rolle, i) => (
                            <RolleDetaljer key={rolle.ident + i} rolle={rolle} withBorder={false} />
                        ))}
                </Cell>
            </Grid>
        </div>
    );
}

function SkjermbildeDetaljer({ saksnummer, skjermbilde }: { saksnummer: string; skjermbilde?: ISkjermbildeDetaljer }) {
    return (
        <div className="flex flex-row">
            <span className="text-base flex items-center font-normal">
                <BodyShort size={"small"}>Saksnr. {saksnummer}</BodyShort>
                <CopyToClipboard size="xsmall" copyText={saksnummer} popoverText="Kopierte saksnummer" />
            </span>
            {skjermbilde && (
                <>
                    <div className="pl-1 pr-1">/</div>
                    <span className="text-base flex items-center font-normal">
                        <BodyShort size={"small"}>
                            {skjermbilde.navn} {skjermbilde.referanse}
                        </BodyShort>
                        <CopyToClipboard size="xsmall" copyText={skjermbilde.referanse} popoverText="Kopiert" />
                    </span>
                </>
            )}
        </div>
    );
}
