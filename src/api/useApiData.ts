import { useSuspenseQuery } from "@tanstack/react-query";

import { PERSON_API } from "./api";
import { Graderingsinfo, PersonDto } from "./PersonApi";

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
export const useHentPersonSkjermingInfo = (ident?: string) => {
    return useSuspenseQuery({
        queryKey: getKey(ident),
        queryFn: async (): Promise<Graderingsinfo> => {
            if (!ident) return { identerTilGradering: {}, identerTilSkjerming: {} };
            const { data } = await PERSON_API.graderingsinfo.hentGraderinger([ident]);
            return data;
        },
        staleTime: Infinity,
    });
};
