import '../styles/globals.css'
import MainContainer from "../components/MainContainer"
import { Provider } from 'react-redux'
import { store } from '../store'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/graphql-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RouteAuthentication } from "../hooks/RouteAuthentication"

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