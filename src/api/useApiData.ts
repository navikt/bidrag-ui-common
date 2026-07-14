import { useSuspenseQuery } from "@tanstack/react-query";

import { StringUtils } from "../utils";
import { PERSON_API } from "./api";
import { Graderingsinfo, PersonDto } from "./PersonApi";

const getKey = (ident?: string) => ["persons", ident ?? "ukjent"];

export const useHentPersonData = (ident?: string) => {
    return useSuspenseQuery({
        queryKey: getKey(ident),
        queryFn: async (): Promise<PersonDto & { harTilgang: boolean }> => {
            if (!ident || StringUtils.isEmpty(ident)) return { ident: "", visningsnavn: "Ukjent", harTilgang: true };
            try {
                const { data } = await PERSON_API.informasjon.hentPersonPost({ ident: ident });
                return { ...data, harTilgang: true };
            } catch (error) {
                console.error("Error fetching person data:", error);
                return { ident, visningsnavn: "Ingen tilgang til person", harTilgang: false };
            }
        },
        staleTime: Infinity,
    });
};
export const useHentPersonSkjermingInfo = (ident?: string) => {
    return useSuspenseQuery({
        queryKey: getKey(ident),
        queryFn: async (): Promise<Graderingsinfo> => {
            if (!ident) return { identerTilGradering: {}, identerTilSkjerming: {} };
            try {
                const { data } = await PERSON_API.graderingsinfo.hentGraderinger([ident]);
                return data;
            } catch (error) {
                console.error("Error fetching grading info:", error);
                // Anta det verste og returner at personen er skjermet hvis vi ikke får hentet graderingsinfo
                return {
                    identerTilGradering: { [ident]: "STRENGT_FORTROLIG" },
                    identerTilSkjerming: { [ident]: true },
                };
            }
        },
        staleTime: Infinity,
    });
};
