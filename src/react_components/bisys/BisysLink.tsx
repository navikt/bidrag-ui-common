import { Link } from "@navikt/ds-react";
import React, { ReactElement } from "react";

interface BisysLinkProps {
    bisysUrl: string;
    page: "sakshistorikk" | "oppgaveliste" | "sak";
}
export default function BisysLink({ bisysUrl, page }: BisysLinkProps): ReactElement {
    const sessionState = new URLSearchParams(window.location.href).get("sessionState");
    function getBisysLink() {
        switch (page) {
            case "oppgaveliste":
                return `${bisysUrl}Oppgaveliste.do?sessionState=${sessionState}`;
            case "sakshistorikk":
                return `${bisysUrl}Sakshistorikk.do?sessionState=${sessionState}`;
        }
    }

    function getLinkLabel() {
        switch (page) {
            case "oppgaveliste":
                return "Tilbake til Oppgavelisten";
            case "sakshistorikk":
                return "Tilbake til Sakshistorikk";
        }
    }

    return <Link href={getBisysLink()}>{getLinkLabel()}</Link>;
}
