import { MutationStatus, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useRQMutationState(compareToKey: string | string[]) {
    const [saveState, setSaveState] = useState<MutationStatus | undefined>();
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = queryClient.getMutationCache().subscribe((cache) => {
            const mutationKey = cache.mutation?.options.mutationKey;
            const mutationKeyList = mutationKey
                ? typeof mutationKey == "string"
                    ? [mutationKey]
                    : (mutationKey as string[])
                : [];
            const isSameMutation = mutationKeyList.every((key) => compareToKey.includes(key));
            if (isSameMutation) {
                setSaveState(cache.mutation?.state?.status);
            }
        });
        return () => unsubscribe();
    });

    return saveState;
}
