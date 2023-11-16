import { MutationStatus, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type MutationKey = any[];
export function useRQMutationState(compareToKeyInput?: MutationKey | MutationKey[], _queryClient?: QueryClient) {
    const [saveState, setSaveState] = useState<MutationStatus>("idle");
    const queryClient = useQueryClient(_queryClient);

    useEffect(() => {
        if (compareToKeyInput == undefined) return;

        const unsubscribe = queryClient.getMutationCache().subscribe((cache) => {
            if (cache.type == "observerOptionsUpdated") return;
            const mutationKey = cache.mutation?.options.mutationKey;
            const mutationKeyList = mutationKey
                ? !Array.isArray(mutationKey)
                    ? [mutationKey]
                    : (mutationKey as string[])
                : [];
            const mutationStatus = cache.mutation?.state?.status;
            const status = mutationStatus == undefined ? "idle" : mutationStatus;
            const compareToMutationKeys = getCompareToMutationKeys();
            const isSameMutation = compareToMutationKeys.some((compareToKey) =>
                mutationKeyList.every((key) => compareToKey.includes(key))
            );
            if (cache?.mutation) {
                console.debug(cache, isSameMutation, mutationKey, mutationKeyList, compareToMutationKeys);
            }
            const hasChanged = status !== saveState;
            if (isSameMutation && hasChanged) {
                setSaveState(status);
            }
        });
        return () => unsubscribe();
    });

    function getCompareToMutationKeys(): any[][] {
        if (compareToKeyInput == null || compareToKeyInput == undefined || compareToKeyInput.length == 0) return [];
        if (Array.isArray(compareToKeyInput[0])) return compareToKeyInput;
        return [compareToKeyInput];
    }
    return saveState;
}
