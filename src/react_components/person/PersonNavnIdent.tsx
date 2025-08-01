import { BodyShort } from "@navikt/ds-react";
import React from "react";

import { useBidragCommons } from "../../api/BidragCommonsContext";
import { RolleType } from "../../types";
import { ISODateTimeStringToDDMMYYYYString } from "../../utils";
import RolleTag from "../roller/RolleTag";
import PersonIdent from "./PersonIdent";
import PersonNavn from "./PersonNavn";
type PersonNavnIdentProps = {
    navn?: string;
    ident?: string;
    fødselsdato?: string;
    rolle?: RolleType;
    skjulNavn?: boolean;
    showCopyButton?: boolean;
    variant?: "compact" | "default";
};
export default function PersonNavnIdent({
    navn,
    ident,
    fødselsdato,
    variant = "default",
    rolle,
    skjulNavn = false,
    showCopyButton = false,
}: PersonNavnIdentProps) {
    const { useHentPersonData } = useBidragCommons();
    const { data: personData } = useHentPersonData(ident);

    const erDød = personData.dødsdato || false;
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

    const Ident = () => {
        return (
            <>
                {ident ? (
                    <PersonIdent ident={ident} showCopyButton={showCopyButton} />
                ) : (
                    <span>{ISODateTimeStringToDDMMYYYYString(fødselsdato)}</span>
                )}
            </>
        );
    };
    if (variant === "default") {
        return (
            <BodyShort
                as="span"
                size="small"
                title={genererTittel()}
                className={`flex items-center gap-2 ${diskresjonskode ? "skjermet" : ""} ${erDød ? "doed" : ""}`}
            >
                {rolle && <RolleTag rolleType={rolle} />}

                {!skjulNavn ? (
                    <>
                        <div className="inline-flex">
                            <Ikoner />
                            <PersonNavn bold navn={personnavn} ident={ident} />
                        </div>

                        <Ident />
                    </>
                ) : (
                    <div className="inline-flex">
                        <Ikoner />
                        <Ident />
                    </div>
                )}
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
            {rolle && <RolleTag rolleType={rolle} />}
            {!skjulNavn ? (
                <>
                    <div className="inline-flex">
                        <Ikoner />
                        <PersonNavn navn={personnavn} />
                    </div>
                    <div>{" "}/{" "}</div>
                    <Ident />
                </>
            ) : (
                <div className="inline-flex">
                    <Ikoner />

                    <Ident />
                </div>
            )}
        </BodyShort>
    );
}
