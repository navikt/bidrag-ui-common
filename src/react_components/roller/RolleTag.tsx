import { Tag } from "@navikt/ds-react";
import React from "react_components";

import { ROLE_TAGS } from "../../types/roller/RoleTags";
import { RolleType } from "../../types/roller/RolleType";

export const RolleTag = ({ rolleType }: { rolleType: RolleType }) => {
    return (
        // @ts-ignore
        <Tag variant={ROLE_TAGS[rolleType]} size="small" className="w-8 mr-2 rounded">
            {rolleType}
        </Tag>
    );
};
