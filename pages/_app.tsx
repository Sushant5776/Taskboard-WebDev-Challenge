import '@/styles/globals.css'
import { Context } from 'ContextProvider'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebaseApp'
import type { AppProps } from 'next/app'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { useStore } from 'store'
import nprogress from 'nprogress'

nprogress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => nprogress.start())
Router.events.on('routeChangeComplete', () => nprogress.done())
Router.events.on('routeChangeError', () => nprogress.done())
function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useStore()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({ type: 'getIn', payload: authUser })
      } else {
        dispatch({ type: 'getOut', payload: null })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!auth.currentUser && router.pathname.includes('/dashboard')) {
      router.replace('/')
    }
  }, [])

  if (
    auth.currentUser &&
    (router.pathname === '/' || router.pathname === '/signup')
  ) {
    router.replace(`dashboard/${auth.currentUser.uid}`)
  }

  return (
    <Context.Provider value={[state, dispatch]}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Context.Provider>
  )
}

export default MyApp
