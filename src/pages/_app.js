// Next imports
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'

// Component imports
import Sidebar from '@/components/Sidebar/Sidebar'

// Style imports
import '@/styles/globals.scss'
import { Patrick_Hand, Patrick_Hand_SC, Public_Sans, Roboto_Mono } from 'next/font/google'
const patrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' })
const patrickHandSC = Patrick_Hand_SC({ subsets: ['latin'], weight: '400' })
const publicSans = Public_Sans({ subsets: ['latin'], style: ['normal', 'italic'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'], style: ['normal', 'italic'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const router = useRouter()
  const showSidebar = router.pathname !== '/' && router.pathname !== '/redeem' && !router.pathname.includes('/invite')
  return (
    <>
      <style jsx global>{`
        :root {
          --font-primary: ${publicSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          --font-headers: ${patrickHand.style.fontFamily}, ${publicSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          --font-buttons: ${patrickHandSC.style.fontFamily}, ${patrickHand.style.fontFamily}, ${publicSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          --font-code: ${robotoMono.style.fontFamily}, monospace;
        }
      `}</style>
      <main>
        <SessionProvider session={session}>
          {showSidebar && <Sidebar />}
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  )
}
