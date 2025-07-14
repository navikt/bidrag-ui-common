import React from "react";

import { useHentPersonData } from "../../api/useApiData";

export default function PersonNavn({ ident, navn, bold }: { ident?: string; navn?: string; bold?: boolean }) {
    const { data: personData } = useHentPersonData(navn ? undefined : ident);

    return <span className={`personnavn ${bold ? "font-bold" : ""}`}>{navn ?? personData.visningsnavn}</span>;
}
