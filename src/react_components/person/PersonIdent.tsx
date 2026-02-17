import { CopyButton } from "@navikt/ds-react";
import React from "react";

const PersonIdent = ({ ident, showCopyButton = false }: { ident: string; showCopyButton?: boolean }) => {
    return (
        <>
            <span className="personident">{ident}</span>
            {showCopyButton && <CopyButton copyText={ident} size="small" />}
        </>
    );
};

export default PersonIdent;
