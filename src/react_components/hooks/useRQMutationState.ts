import { MutationStatus, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type MutationKey = any[];

export type MutationErrorInfo = {
    key: MutationKey;
    message: string;
};

export type MutationStateSummary = {
    status: MutationStatus;
    errors: MutationErrorInfo[];
    pendingKeys: MutationKey[];
};

const UNKNOWN_ERROR_MESSAGE = "Unknown error";

export function useRQMutationState(compareToKeyInput?: MutationKey | MutationKey[], _queryClient?: QueryClient) {
    const [saveState, setSaveState] = useState<MutationStateSummary>({ status: "idle", errors: [], pendingKeys: [] });
    const queryClient = useQueryClient(_queryClient);

    useEffect(() => {
        if (compareToKeyInput == undefined) return;

        const mutationCache = queryClient.getMutationCache();

        const updateState = () => {
            const compareToMutationKeys = getCompareToMutationKeys();
            const matchingMutations = mutationCache.getAll().filter((mutation) => {
                const mutationKey = mutation.options.mutationKey;
                const mutationKeyList = mutationKey
                    ? !Array.isArray(mutationKey)
                        ? [mutationKey]
                        : (mutationKey as string[])
                    : [];
                return compareToMutationKeys.some((compareToKey) =>
                    mutationKeyList.every((key) => compareToKey.includes(key))
                );
            });

            let nextState: MutationStateSummary = { status: "idle", errors: [], pendingKeys: [] };
            if (matchingMutations.length === 0) {
                setSaveState((prev) => (areStatesEqual(prev, nextState) ? prev : nextState));
                return;
            }

            const statuses = matchingMutations.map((mutation) => mutation.state.status ?? "idle");
            const hasPending = statuses.some((status) => status === "pending");
            if (hasPending) {
                const pendingKeys = matchingMutations
                    .filter((mutation) => mutation.state.status === "pending")
                    .map((mutation) => (mutation.options.mutationKey ?? []) as MutationKey);
                nextState = { status: "pending", errors: [], pendingKeys };
                setSaveState((prev) => (areStatesEqual(prev, nextState) ? prev : nextState));
                return;
            }

            const errorMutations = matchingMutations.filter((mutation) => mutation.state.status === "error");
            if (errorMutations.length > 0) {
                const errors = errorMutations.map((mutation) => {
                    const error = mutation.state.error as { message?: string } | null | undefined;
                    return {
                        key: (mutation.options.mutationKey ?? []) as MutationKey,
                        message: error?.message ?? UNKNOWN_ERROR_MESSAGE,
                    };
                });
                nextState = { status: "error", errors, pendingKeys: [] };
                setSaveState((prev) => (areStatesEqual(prev, nextState) ? prev : nextState));
                return;
            }

            const isAllSuccess = statuses.every((status) => status === "success");
            nextState = { status: isAllSuccess ? "success" : "idle", errors: [], pendingKeys: [] };
            setSaveState((prev) => (areStatesEqual(prev, nextState) ? prev : nextState));
        };

        updateState();

        const unsubscribe = mutationCache.subscribe((cache) => {
            if (cache.type === "observerOptionsUpdated") return;
            updateState();
        });
        return () => unsubscribe();
    }, [compareToKeyInput, queryClient]);

    function getCompareToMutationKeys(): MutationKey[] {
        if (compareToKeyInput == null || compareToKeyInput == undefined || compareToKeyInput.length == 0) return [];
        if (Array.isArray(compareToKeyInput[0])) return compareToKeyInput as MutationKey[];
        return [compareToKeyInput as MutationKey];
    }
    return saveState;
}

function areStatesEqual(left: MutationStateSummary, right: MutationStateSummary) {
    if (left.status !== right.status) return false;
    if (left.errors.length !== right.errors.length) return false;
    if (left.pendingKeys.length !== right.pendingKeys.length) return false;
    
    const errorsEqual = left.errors.every((error, index) => {
        const compareTo = right.errors[index];
        if (compareTo == null) return false;
        if (error.message !== compareTo.message) return false;
        return areKeysEqual(error.key, compareTo.key);
    });
    
    const pendingKeysEqual = left.pendingKeys.every((key, index) => {
        const compareTo = right.pendingKeys[index];
        if (compareTo == null) return false;
        return areKeysEqual(key, compareTo);
    });
    
    return errorsEqual && pendingKeysEqual;
}

function areKeysEqual(left: MutationKey, right: MutationKey) {
    if (left.length !== right.length) return false;
    return left.every((value, index) => value === right[index]);
}
