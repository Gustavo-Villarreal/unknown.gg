import '../styles/globals.css'
import '../configureAmplify'
import NavBar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar/>
      <div className='px-16 py-7 '>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
