import { BodyShort } from "@navikt/ds-react";

import { useHentPersonData } from "../../api/useApiData";
import { ISODateTimeStringToDDMMYYYYString } from "../../utils";
import PersonIdent from "./PersonIdent";
import PersonNavn from "./PersonNavn";

type PersonNavnIdentProps = {
    navn?: string;
    ident?: string;
    fødselsdato?: string;
    variant?: "compact" | "default";
};
export default function PersonNavnIdent({ navn, ident, fødselsdato, variant = "default" }: PersonNavnIdentProps) {
    const { data: personData } = useHentPersonData(ident);

    const erDød = personData.dødsdato || true;
    const diskresjonskode = personData.diskresjonskode || false;
    const personnavn = navn ?? personData.visningsnavn;
    const genererTittel = () => {
        let tittel = "";
        if (diskresjonskode) {
            tittel += "Personen har diskresjonskode";
        }
        if (erDød) {
            tittel += tittel ? ", " : "";
            tittel += "Personen er død";
        }
        return tittel;
    };

    const Ikoner = () => {
        return (
            <div className="mr-1">
                {diskresjonskode && <span>*</span>}
                {erDød && <span>&dagger;</span>}
            </div>
        );
    };

    if (variant === "default") {
        return (
            <BodyShort
                as="span"
                size="small"
                title={genererTittel()}
                className={`flex items-center gap-4 ${diskresjonskode ? "skjermet" : ""} ${erDød ? "doed" : ""}`}
            >
                <div className="inline-flex">
                    <Ikoner />
                    <PersonNavn bold navn={personnavn} ident={ident} />
                </div>

                {ident ? <PersonIdent ident={ident} /> : <span>{ISODateTimeStringToDDMMYYYYString(fødselsdato)}</span>}
            </BodyShort>
        );
    }
    return (
        <BodyShort
            as="span"
            size="small"
            className={`flex gap-1 ${diskresjonskode ? "skjermet" : ""} ${erDød ? "doed" : ""}`}
            title={genererTittel()}
        >
            <div className="inline-flex">
                <Ikoner />
                <PersonNavn navn={personnavn} />
            </div>
            <div>/</div>
            {ident ? <PersonIdent ident={ident} /> : <span>{ISODateTimeStringToDDMMYYYYString(fødselsdato)}</span>}
        </BodyShort>
    );
}
