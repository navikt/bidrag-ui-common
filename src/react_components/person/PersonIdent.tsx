import { CopyButton } from "@navikt/ds-react";
import React from "react";

const PersonIdent = ({
    ident,
    showCopyButton = false,
    ignoreClickOnIdent = false,
}: {
    ident: string;
    showCopyButton?: boolean;
    ignoreClickOnIdent?: boolean;
}) => {
    return (
        <div
            className={`flex flex-row gap-1 items-center`}
            onClick={(e) => {
                if (ignoreClickOnIdent) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            <span className="personident">{ident}</span>
            {showCopyButton && <CopyButton copyText={ident} size="small" style={{ zIndex: 10000 }} />}
        </div>
    );
};

export default PersonIdent;
