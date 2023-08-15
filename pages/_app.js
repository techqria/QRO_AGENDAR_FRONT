import '../styles/globals.css'
import MainContainer from "../components/MainContainer"
import { Provider } from 'react-redux'
import { store } from '../store'
import { useRouter } from 'next/router'
import { RouteAuthentication } from "../hooks/RouteAuthentication"
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  useEffect(() => {
    RouteAuthentication(router)
  }, []);

  return (
    <Provider store={store}>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </Provider>
  )
}

export default MyApp
