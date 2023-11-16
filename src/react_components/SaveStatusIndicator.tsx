import { CheckmarkCircleIcon, XMarkOctagonIcon } from "@navikt/aksel-icons";
import { BodyShort, Loader } from "@navikt/ds-react";
import { MutationStatus, QueryClient } from "@tanstack/react-query";

import { MutationKey, useRQMutationState } from "./hooks";
type SaveStatusIndicatorProps = {
    mutationKey?: MutationKey | MutationKey[];
    state?: MutationStatus;
    queryClient?: QueryClient;
};
export default function SaveStatusIndicator({
    state: stateInput,
    mutationKey,
    queryClient: _queryClient,
}: SaveStatusIndicatorProps) {
    const saveState = useRQMutationState(mutationKey, _queryClient);
    const state = stateInput ?? saveState;
    function renderContent() {
        if (state == "error") {
            return (
                <div className="inline-flex text-nav-red gap-[3px]">
                    <XMarkOctagonIcon /> <BodyShort size="small">Lagring feilet</BodyShort>
                </div>
            );
        }
        if (state == "pending") {
            return (
                <div className="inline-flex gap-[3px]">
                    <Loader size="xsmall" title="Lagrer" />
                    <BodyShort size="small">Lagrer...</BodyShort>
                </div>
            );
        }
        return (
            <div className="inline-flex gap-[3px]">
                <div className="text-green-500">
                    <CheckmarkCircleIcon />
                </div>{" "}
                <BodyShort size="small">Lagret</BodyShort>
            </div>
        );
    }

    function getStyles() {
        if (state == "error") {
            return `border-border-danger pr-1 pl-1 w-[122px]`;
        }
        if (state == "pending") {
            return `border-border-info w-[70px]`;
        }
        return `transition-[width] ease-in-out border-border-success duration-300 w-[65px]`;
    }
    return <div className={`${getStyles()} self-center`}>{renderContent()}</div>;
}
