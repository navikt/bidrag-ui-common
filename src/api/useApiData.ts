import { useSuspenseQuery } from "@tanstack/react-query";

import { PERSON_API } from "./api";
import { useBidragCommons } from "./BidragCommonsContext";
import { PersonDto } from "./PersonApi";

const getKey = (ident: string) => ["persons2", ident ?? "ukjent"];

export const useHentPersonData = (ident?: string) => {
    const { queryClient } = useBidragCommons();
    return useSuspenseQuery(
        {
            queryKey: getKey(ident ?? ""),
            queryFn: async (): Promise<PersonDto> => {
                console.log("Fetch", ident);
                if (!ident) return { ident: "", visningsnavn: "Ukjent" };
                const { data } = await PERSON_API.informasjon.hentPersonPost({ ident: ident });
                return data;
            },
        },
        queryClient
    );
};
