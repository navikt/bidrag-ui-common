import { Tag } from "@navikt/ds-react";

import { useBidragCommons } from "../../api/BidragCommonsContext";
import { ROLE_FORKORTELSER, ROLE_TAGS, ROLE_TAGS_REVURDERING } from "../../types/roller/RoleTags";
import { RolleType } from "../../types/roller/RolleType";

const RolleTag = ({ rolleType, className, ident }: { rolleType: RolleType; className?: string; ident?: string }) => {
    const { useHentRevurderingsbarn } = useBidragCommons();

    const erRevurdering = useHentRevurderingsbarn && ident ? useHentRevurderingsbarn(ident) : false;
    return (
        // @ts-ignore
        <Tag
            title={erRevurdering ? "Revurderingsbarn" : ""}
            variant={erRevurdering ? ROLE_TAGS_REVURDERING[rolleType] : ROLE_TAGS[rolleType]}
            size="small"
            className={`w-8 mr-2 rounded select-none rolleTag ${rolleType} ${className}`}
        >
            {/** @ts-ignore */}
            {ROLE_FORKORTELSER[rolleType] ?? rolleType}
        </Tag>
    );
};

export default RolleTag;
