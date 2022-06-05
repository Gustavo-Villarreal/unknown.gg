import '../styles/globals.css'
import '../configureAmplify'
import NavBar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div data-theme="synthwave">
      <NavBar/>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
