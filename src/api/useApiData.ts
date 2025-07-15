import { useSuspenseQuery } from "@tanstack/react-query";

import { PERSON_API } from "./api";
import { PersonDto } from "./PersonApi";

const getKey = (ident?: string) => ["persons", ident ?? "ukjent"];

export const useHentPersonData = (ident?: string) => {
    return useSuspenseQuery({
        queryKey: getKey(ident),
        queryFn: async (): Promise<PersonDto> => {
            if (!ident) return { ident: "", visningsnavn: "Ukjent" };
            const { data } = await PERSON_API.informasjon.hentPersonPost({ ident: ident });
            return data;
        },
        staleTime: Infinity,
    });
};
