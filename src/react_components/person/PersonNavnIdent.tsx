import { BodyShort } from "@navikt/ds-react";

import { useHentPersonData } from "../../api/useApiData";
import { ISODateTimeStringToDDMMYYYYString } from "../../utils";
import PersonIdent from "./PersonIdent";
import PersonNavn from "./PersonNavn";

type PersonNavnIdentProps = {
    navn?: string;
    ident?: string;
    fødselsdato?: string;
    erDød: boolean;
    harDisreksjon: boolean;
    variant?: "compact" | "default";
};
export default function PersonNavnIdent({ navn, ident, fødselsdato, variant = "default" }: PersonNavnIdentProps) {
    const { data: personData } = useHentPersonData(ident);

    const genererTittel = () => {
        if (personData.diskresjonskode) {
            return "Personen har diskresjonskode";
        }
        if (personData.dødsdato) {
            return "Personen er død";
        }
        return "";
    };

    if (variant === "default") {
        return (
            <BodyShort
                as="span"
                size="small"
                title={genererTittel()}
                className={`flex items-center gap-4 ${personData?.diskresjonskode ? "skjermet" : ""}`}
            >
                <PersonNavn bold navn={navn} ident={ident} />
                <div className="inline">
                    {ident ? (
                        <PersonIdent ident={ident} />
                    ) : (
                        <span>{ISODateTimeStringToDDMMYYYYString(fødselsdato)}</span>
                    )}
                    {personData?.diskresjonskode && <span className="disk">*</span>}
                </div>
            </BodyShort>
        );
    }
    return (
        <BodyShort
            as="span"
            size="small"
            className={`gap-2 ${personData?.diskresjonskode ? "skjermet" : ""}`}
            title={genererTittel()}
        >
            <PersonNavn navn={navn} /> /{" "}
            <div className="inline">
                {ident ? <PersonIdent ident={ident} /> : <span>{ISODateTimeStringToDDMMYYYYString(fødselsdato)}</span>}
                {personData?.diskresjonskode && <span className="disk">*</span>}
            </div>
        </BodyShort>
    );
}
