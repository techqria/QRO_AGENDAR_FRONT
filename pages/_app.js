import '../styles/globals.css'
import MainContainer from "../components/MainContainer"
import { Provider } from 'react-redux'
import { store } from '../store'
import { useRouter } from 'next/router'
import { RouteAuthentication } from "../hooks/RouteAuthentication"
import { useEffect } from 'react'
import { ApolloProvider, useLazyQuery } from '@apollo/client'
import { useApollo } from '../graphql/graphql-client'
import { VERIFY_TOKEN_QUERY } from '../graphql/services/auth.service'

function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo()

  const router = useRouter()

  useEffect(() => {
    RouteAuthentication(router)
  }, []);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
