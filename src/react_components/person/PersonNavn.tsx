import React from "react";

import { useBidragCommons } from "../../api/BidragCommonsContext";

export default function PersonNavn({
    ident,
    navn,
    bold,
    bareFornavn = false,
}: {
    ident?: string;
    navn?: string;
    bold?: boolean;
    bareFornavn?: boolean;
}) {
    const { useHentPersonData } = useBidragCommons();
    const { data: personData } = useHentPersonData(navn ? undefined : ident);
    return (
        <span className={`personnavn ${bold ? "font-bold" : ""}`}>
            {navn ?? (bareFornavn ? personData.fornavn : personData.visningsnavn)}
        </span>
    );
}
