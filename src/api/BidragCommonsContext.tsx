import { QueryClient, QueryClientProvider, UseSuspenseQueryResult } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useRef } from "react";

import { PersonDto } from "./PersonApi";
import { useHentPersonData } from "./useApiData";

// Define context type
interface BidragCommonsContextType {
    queryClient: QueryClient;
    useHentPersonData: (ident?: string) => UseSuspenseQueryResult<PersonDto, any>;
}

// Create context with undefined default value
const BidragCommonsContext = createContext<BidragCommonsContextType | undefined>(undefined);

// Define provider props
interface BidragCommonsProviderProps {
    children: ReactNode;
    client?: QueryClient;
    useHentPersonData?: (ident?: string) => UseSuspenseQueryResult<PersonDto, any>;
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
}) => {
    const queryClient = useRef(client ?? createClient());
    return (
        <BidragCommonsContext.Provider
            value={{ queryClient: queryClient.current, useHentPersonData: useHentPersonDataInput ?? useHentPersonData }}
        >
            <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>
        </BidragCommonsContext.Provider>
    );
};

// Create hook for consuming the context
export const useBidragCommons = () => {
    const context = useContext(BidragCommonsContext);
    if (context === undefined) {
        throw new Error("useBidragCommons must be used within a BidragCommonsProvider");
    }
    return context;
};

export default BidragCommonsProvider;
