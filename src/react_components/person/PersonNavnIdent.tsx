import { BodyShort } from "@navikt/ds-react";
import React from "react";

import { useBidragCommons } from "../../api/BidragCommonsContext";
import { RolleType } from "../../types";
import { dateOrNull, ISODateTimeStringToDDMMYYYYString } from "../../utils";
import RolleTag from "../roller/RolleTag";
import PersonIdent from "./PersonIdent";
import PersonNavn from "./PersonNavn";

type PersonNavnIdentProps = {
    navn?: string;
    ident?: string;
    fødselsdato?: string;
    rolle?: RolleType;
    stønad18År?: boolean;
    skjulNavn?: boolean;
    showCopyButton?: boolean;
    visAlder?: boolean;
    bareFornavn?: boolean;
    variant?: "compact" | "default" | "navnIdent";
};
export default function PersonNavnIdent({
    navn,
    ident,
    fødselsdato,
    variant = "default",
    rolle,
    skjulNavn = false,
    bareFornavn = false,
    visAlder = false,
    showCopyButton = false,
    stønad18År = false,
}: PersonNavnIdentProps) {
    const { useHentPersonData } = useBidragCommons();
    // const { data: graderingsinfo } = useHentPersonSkjermingInfo(ident);
    const { data: personData } = useHentPersonData(ident);

    const erDød = personData.dødsdato || false;
    const erKode67 =
        personData.diskresjonskode === "SPSF" ||
        personData.diskresjonskode === "SPFO" ||
        personData.diskresjonskode === "P19";
    // const skjermet = false; //ident ? graderingsinfo.identerTilSkjerming[ident] : false;
    const personnavn = navn ?? (bareFornavn ? personData.fornavn : personData.visningsnavn);
    const genererTittel = () => {
        let tittel = "";
        // if (skjermet) {
        //     tittel += "Personen er skjermet";
        // }
        if (erKode67) {
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
            <span>
                {/* {skjermet && <span>*</span>} */}
                {erKode67 && <span>*</span>}
                {erDød && <span>&dagger;</span>}
            </span>
        );
    };

    const Ident = ({ visAlder = false }: { visAlder?: boolean }) => {
        const birthdate = dateOrNull(fødselsdato ?? personData.fødselsdato);
        const calculateAge = (born: Date): number => {
            const today = new Date();
            let age = today.getFullYear() - born.getFullYear();
            const monthDiff = today.getMonth() - born.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < born.getDate())) {
                age--;
            }
            return age;
        };
        const age = birthdate ? calculateAge(birthdate) : null;
        return (
            <>
                {ident ? (
                    <div className="flex flex-row gap-1">
                        <PersonIdent ident={ident} showCopyButton={showCopyButton} />
                        {visAlder && age && <span>({age} år)</span>}
                    </div>
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
                className={`flex items-center gap-2 ${erKode67 ? "skjermet" : ""} ${erDød ? "doed" : ""}`}
            >
                {rolle && <RolleTag rolleType={rolle} ident={ident} />}

                {!skjulNavn ? (
                    <>
                        <span className="inline-flex">
                            <Ikoner />
                            <PersonNavn bold navn={personnavn} ident={ident} bareFornavn={bareFornavn} />
                        </span>

                        <Ident visAlder={visAlder} />
                    </>
                ) : (
                    <span className="inline-flex">
                        <Ikoner />
                        <Ident visAlder={visAlder} />
                    </span>
                )}
            </BodyShort>
        );
    }
    if (variant === "navnIdent") {
        return (
            <BodyShort
                as="span"
                size="small"
                title={genererTittel()}
                className={`flex flex-row items-center gap-2 ${erKode67 ? "skjermet" : ""} ${erDød ? "doed" : ""}`}
            >
                {rolle && <RolleTag rolleType={rolle} ident={ident} />}

                <div className="flex flex-col items-start">
                    {!skjulNavn ? (
                        <>
                            <span className="inline-flex whitespace-nowrap">
                                <Ikoner />
                                <PersonNavn bold navn={personnavn} ident={ident} bareFornavn={bareFornavn} />
                            </span>

                            <Ident visAlder={visAlder} />
                        </>
                    ) : (
                        <span className="inline-flex">
                            <Ikoner />
                            <Ident visAlder={visAlder} />
                        </span>
                    )}
                </div>
            </BodyShort>
        );
    }
    return (
        <BodyShort
            as="span"
            size="small"
            className={`flex gap-1 self-center items-center ${erKode67 ? "skjermet" : ""} ${erDød ? "doed" : ""}`}
            title={genererTittel()}
        >
            {rolle && <RolleTag rolleType={rolle} className="h-max" ident={ident} stønad18År={stønad18År} />}
            {!skjulNavn ? (
                <>
                    <span className="inline-flex">
                        <Ikoner />
                        <PersonNavn navn={personnavn} bareFornavn={bareFornavn} />
                    </span>
                    <span> /</span>
                    <Ident visAlder={visAlder} />
                </>
            ) : (
                <span className="inline-flex">
                    <Ikoner />

                    <Ident visAlder={visAlder} />
                </span>
            )}
        </BodyShort>
    );
}
