import React from "react";

import { useBidragCommons } from "../../api/BidragCommonsContext";

export default function PersonNavn({ ident, navn, bold }: { ident?: string; navn?: string; bold?: boolean }) {
    const { useHentPersonData } = useBidragCommons();
    const { data: personData } = useHentPersonData(navn ? undefined : ident);
    return <span className={`personnavn ${bold ? "font-bold" : ""}`}>{navn ?? personData.visningsnavn}</span>;
}
