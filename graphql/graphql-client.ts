import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { HttpLink} from "apollo-link-http";

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_DEV_API_URL :  process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Authorization": "Bearer " + (typeof window !== 'undefined' ? window.localStorage.getItem("token") : null)
        },
    }),
    cache: new InMemoryCache({addTypename: false}),

});