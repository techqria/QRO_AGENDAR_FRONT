import '../styles/globals.css'
import MainContainer from "../components/MainContainer"
import { Provider } from 'react-redux'
import { store } from '../store'

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </Provider>
  )
}

export default MyApp
