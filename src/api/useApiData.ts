import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { PERSON_API } from "./api";
import { PersonDto } from "./PersonApi";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            retryDelay: 2000,
        },
    },
});
export const useHentPersonData = (ident?: string) =>
    useSuspenseQuery(
        {
            queryKey: ["persons", ident],
            queryFn: async (): Promise<PersonDto> => {
                if (!ident) return { ident: "", visningsnavn: "Ukjent" };
                const { data } = await PERSON_API.informasjon.hentPersonPost({ ident: ident });
                return data;
            },
            staleTime: Infinity,
        },
        queryClient
    );
