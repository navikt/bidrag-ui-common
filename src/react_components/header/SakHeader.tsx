import { BodyShort, CopyButton } from "@navikt/ds-react";

import { IRolleDetaljer } from "../../types/roller/IRolleDetaljer";
import { RolleType } from "../../types/roller/RolleType";
import BidragCell from "../grid/BidragCell";
import BidragGrid from "../grid/BidragGrid";
import RolleDetaljer from "../roller/RolleDetaljer";

interface ISkjermbildeDetaljer {
    navn: string;
    referanse: string | number;
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
            <BidragGrid
                className={
                    "max-w-5xl grid-flow-row grid-rows-none md:grid-flow-col sm:grid-rows-4 md:grid-rows-4 lg:grid-rows-3 xl:grid-rows-3 2xl:grid-rows-2 gap-1 grid-cols-[max-content]"
                }
            >
                {roller
                    ?.filter((r) => r.rolleType != RolleType.BA && r.rolleType != RolleType.BARN)
                    .map((rolle, i) => (
                        <BidragCell key={rolle.ident + i} xs={12} md={7} lg={7}>
                            <RolleDetaljer rolle={rolle} withBorder={false} />
                        </BidragCell>
                    ))}
                {roller
                    ?.filter((r) => r.rolleType == RolleType.BA || r.rolleType == RolleType.BARN)
                    .map((rolle, i) => (
                        <BidragCell key={rolle.ident + i} xs={12} md={7} lg={7}>
                            <RolleDetaljer rolle={rolle} withBorder={false} />
                        </BidragCell>
                    ))}
            </BidragGrid>
        </div>
    );
}

function SkjermbildeDetaljer({ saksnummer, skjermbilde }: { saksnummer: string; skjermbilde?: ISkjermbildeDetaljer }) {
    return (
        <div className="flex flex-row">
            <span className="text-base flex items-center font-normal">
                <BodyShort size={"small"}>Saksnr. {saksnummer}</BodyShort>
                <CopyButton size="small" copyText={saksnummer} activeText="Kopierte saksnummer" />
            </span>
            {skjermbilde && (
                <>
                    <div className="mx-1 self-center">/</div>
                    <span className="text-base flex items-center font-normal">
                        <BodyShort size={"small"}>
                            {skjermbilde.navn} {skjermbilde.referanse}
                        </BodyShort>
                        <CopyButton size="small" copyText={skjermbilde.referanse?.toString()} activeText="Kopiert" />
                    </span>
                </>
            )}
        </div>
    );
}
