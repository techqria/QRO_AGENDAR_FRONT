import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";
import { getJwtCookie } from "../hooks/GetJwtCookie";

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Authorization": "Bearer " + (typeof window !== 'undefined' ? getJwtCookie(document.cookie) : null)
        },
    }),
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        }
    }
})

export function useApollo() {
    const client = useMemo(() => apolloClient, [])
    return client
}

export { apolloClient }