import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:2069/graphql',
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        }
    }),
    cache: new InMemoryCache(),
});