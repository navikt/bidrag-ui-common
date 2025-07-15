import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useRef } from "react";

// Define context type
interface BidragCommonsContextType {
    queryClient: QueryClient;
}

// Create context with undefined default value
const BidragCommonsContext = createContext<BidragCommonsContextType | undefined>(undefined);

// Define provider props
interface BidragCommonsProviderProps {
    children: ReactNode;
    client?: QueryClient;
}

// Create provider component
export const BidragCommonsProvider: React.FC<BidragCommonsProviderProps> = ({ children, client }) => {
    const queryClient = useRef(
        client ??
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    retry: 3,
                    retryDelay: 2000,
                },
            },
        })
    );
    return (
        <BidragCommonsContext.Provider value={{ queryClient: queryClient.current }}>
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
