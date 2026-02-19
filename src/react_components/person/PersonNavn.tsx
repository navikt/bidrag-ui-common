import { Loader } from "@navikt/ds-react";
import React, { Suspense } from "react";

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
    if (navn) {
        return <span className={`personnavn ${bold ? "font-bold" : ""}`}>{navn}</span>;
    }

    return (
        <Suspense
            fallback={
                <span className={`personnavn ${bold ? "font-bold" : ""}`}>
                    {ident} <Loader size="xsmall" style={{ display: "inline-block", marginLeft: "4px" }} />
                </span>
            }
        >
            <PersonNavnContent ident={ident} bold={bold} bareFornavn={bareFornavn} />
        </Suspense>
    );
}

function PersonNavnContent({ ident, bold, bareFornavn }: { ident?: string; bold?: boolean; bareFornavn?: boolean }) {
    const { useHentPersonData } = useBidragCommons();
    const { data: personData } = useHentPersonData(ident);

    return (
        <span className={`personnavn ${bold ? "font-bold" : ""}`}>
            {bareFornavn ? personData?.fornavn : personData?.visningsnavn}
        </span>
    );
}
