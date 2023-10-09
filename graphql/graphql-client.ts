import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: 'https://qro-agendar-back.vercel.app',
        headers: {
            "Authorization": "Bearer " + (typeof window !== 'undefined' ? window.localStorage.getItem("token") : null)
        }
    }),
    cache: new InMemoryCache(),
});