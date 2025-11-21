import { QueryClient, QueryClientProvider, UseSuspenseQueryResult } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

import { Graderingsinfo, PersonDto } from "./PersonApi";
import { useHentPersonData, useHentPersonSkjermingInfo } from "./useApiData";

// Define context type
interface BidragCommonsContextType {
    queryClient: QueryClient;
    useHentPersonData: (ident?: string) => UseSuspenseQueryResult<PersonDto, any>;
    useHentRevurderingsbarn?: (ident?: string) => boolean;
    useHentPersonSkjermingInfo: (ident?: string) => UseSuspenseQueryResult<Graderingsinfo, any>;
    erMaskert: boolean; // NYTT
}

// Create context with undefined default value
const BidragCommonsContext = createContext<BidragCommonsContextType | undefined>(undefined);

// Define provider props
interface BidragCommonsProviderProps {
    children: ReactNode;
    client?: QueryClient;
    useHentPersonData?: (ident?: string) => UseSuspenseQueryResult<PersonDto, any>;
    useHentRevurderingsbarn?: (ident?: string) => boolean;
}

const createClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 3,
                retryDelay: 2000,
            },
        },
    });
};

// Create provider component
export const BidragCommonsProvider: React.FC<BidragCommonsProviderProps> = ({
    children,
    client,
    useHentPersonData: useHentPersonDataInput,
    useHentRevurderingsbarn,
}) => {
    const queryClient = useRef(client ?? createClient());
    const id = useRef(Math.random());
    const [erMaskert, setErMaskert] = useState<boolean>(false);

    useEffect(() => {
        window.localStorage.setItem("blur-sensitive-info-master", id.current.toString());

        // Fjern gammel maskerings-tilstand
        window.localStorage.removeItem("blur-sensitive-info");

        const eventListener = (e: KeyboardEvent) => {
            const masterId = window.localStorage.getItem("blur-sensitive-info-master");
            if (masterId !== id.current.toString()) return;

            if (e.ctrlKey && (e.key === "ø" || e.key === "|")) {
                e.preventDefault();

                document.body.classList.toggle("blur-sensitive-info");
                window.localStorage.setItem(
                    "blur-sensitive-info",
                    document.body.classList.contains("blur-sensitive-info").toString()
                );

                setErMaskert((forrige) => !forrige);
            }
        };

        document.addEventListener("keydown", eventListener);
        return () => document.removeEventListener("keydown", eventListener);
    }, []);

    return (
        <BidragCommonsContext.Provider
            value={{
                queryClient: queryClient.current,
                useHentPersonData: useHentPersonDataInput ?? useHentPersonData,
                useHentRevurderingsbarn: useHentRevurderingsbarn,
                useHentPersonSkjermingInfo: useHentPersonSkjermingInfo,
                erMaskert,
            }}
        >
            <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>
        </BidragCommonsContext.Provider>
    );
};

export const useBidragCommons = () => {
    const context = useContext(BidragCommonsContext);
    if (context === undefined) {
        throw new Error("useBidragCommons must be used within a BidragCommonsProvider");
    }
    return context;
};

export default BidragCommonsProvider;
