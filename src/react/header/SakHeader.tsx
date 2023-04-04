import { Heading } from "@navikt/ds-react";
import { Cell } from "@navikt/ds-react";
import { Grid } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import React from "react";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import { RolleType } from "../../types/roller/RolleType";
import { RolleDetaljer } from "../roller/RolleDetaljer";

interface ISakHeaderProps {
    saksnummer: string;
    tittel?: string;
    roller: IRolleDetaljer[];
}
export default function SakHeader({ saksnummer, roller, tittel }: ISakHeaderProps) {
    return (
        <div className="bg-[var(--a-gray-50)] border-[var(--a-border-divider)] border-solid border-b w-full">
            <div className="px-6 py-2 leading-10 flex items-center gap-x-4 border-[var(--a-border-divider)] border-solid border-b">
                {tittel ? (
                    <>
                        <Heading level="1" size="xlarge">
                            {tittel}
                        </Heading>
                        <Saksnummer saksnummer={saksnummer} isSmall />
                    </>
                ) : (
                    <Saksnummer saksnummer={saksnummer} />
                )}
            </div>

            <Grid>
                <Cell xs={12} sm={8} md={9} lg={3}>
                    {roller
                        ?.filter((r) => r.rolleType != RolleType.BA)
                        .map((rolle, i) => (
                            <RolleDetaljer key={rolle.ident + i} rolle={rolle} withBorder={false} />
                        ))}
                </Cell>
                <Cell xs={12} md={8} lg={6}>
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

function Saksnummer({ saksnummer, isSmall }: { saksnummer: string; isSmall?: boolean }) {
    return (
        <span className="text-base flex items-center font-normal">
            <Heading size={isSmall ? "xsmall" : "large"}>Saksnr. {saksnummer}</Heading>
            <CopyToClipboard size="small" copyText={saksnummer} popoverText="Kopierte saksnummer" />
        </span>
    );
}
