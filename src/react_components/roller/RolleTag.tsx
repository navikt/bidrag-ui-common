import { Tag } from "@navikt/ds-react";

import { useBidragCommons } from "../../api/BidragCommonsContext";
import { ROLE_FORKORTELSER, ROLE_TAGS, ROLE_TAGS_REVURDERING } from "../../types/roller/RoleTags";
import { RolleType } from "../../types/roller/RolleType";

const RolleTag = ({
    rolleType,
    className,
    ident,
    stønad18År,
}: {
    rolleType: RolleType;
    className?: string;
    ident?: string;
    stønad18År?: boolean;
}) => {
    const { useHentRevurderingsbarn } = useBidragCommons();

    //@ts-ignore
    const renderRolletype = ROLE_FORKORTELSER[rolleType] ?? rolleType;
    const erRevurdering = useHentRevurderingsbarn && ident ? useHentRevurderingsbarn(ident) : false;
    return (
        // @ts-ignore
        <Tag
            title={erRevurdering ? "Revurderingsbarn" : ""}
            variant={erRevurdering ? ROLE_TAGS_REVURDERING[rolleType] : ROLE_TAGS[rolleType]}
            size="small"
            className={`w-8 mr-2 rounded select-none rolleTag ${rolleType} ${className}`}
        >
            {stønad18År ? `${renderRolletype}¹⁸` : renderRolletype}
        </Tag>
    );
};

export default RolleTag;
