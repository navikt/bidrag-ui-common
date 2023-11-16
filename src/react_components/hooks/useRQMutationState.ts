import { MutationStatus, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useRQMutationState(compareToKey?: any | any[], _queryClient?: QueryClient) {
    const [saveState, setSaveState] = useState<MutationStatus>("idle");
    const queryClient = useQueryClient(_queryClient);

    useEffect(() => {
        if (compareToKey == undefined) return;

        const unsubscribe = queryClient.getMutationCache().subscribe((cache) => {
            if (cache.type == "observerOptionsUpdated") return;
            const mutationKey = cache.mutation?.options.mutationKey;
            const mutationKeyList = mutationKey
                ? typeof mutationKey != "object"
                    ? [mutationKey]
                    : (mutationKey as string[])
                : [];
            const mutationStatus = cache.mutation?.state?.status;
            const status = mutationStatus == undefined ? "idle" : mutationStatus;
            const isSameMutation = mutationKeyList.every((key) => compareToKey.includes(key));
            if (cache?.mutation) {
                console.debug(cache, isSameMutation, mutationKey, compareToKey);
            }
            const hasChanged = status !== saveState;
            if (isSameMutation && hasChanged) {
                setSaveState(status);
            }
        });
        return () => unsubscribe();
    });

    return saveState;
}
