import { Tag } from "@navikt/ds-react";

import { ROLE_FORKORTELSER, ROLE_TAGS } from "../../types/roller/RoleTags";
import { RolleType } from "../../types/roller/RolleType";

const RolleTag = ({ rolleType, className }: { rolleType: RolleType; className?: string }) => {
    return (
        // @ts-ignore
        <Tag
            variant={ROLE_TAGS[rolleType]}
            size="small"
            className={`w-8 mr-2 rounded select-none rolleTag ${rolleType} ${className}`}
        >
            {/** @ts-ignore */}
            {ROLE_FORKORTELSER[rolleType] ?? rolleType}
        </Tag>
    );
};

export default RolleTag;
