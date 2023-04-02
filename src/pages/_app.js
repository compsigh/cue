import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Sidebar from '@/components/Sidebar/Sidebar'
import '@/styles/globals.scss'
import { Patrick_Hand } from '@next/font/google'
const patrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' });

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const router = useRouter();
  const showSidebar = router.pathname !== '/';
  return (
    <>
      <style jsx global>{`
        :root {
          --font-stack: 'Patrick Hand', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
      `}</style>
      <main className={patrickHand.className}>
        <SessionProvider session={session}>
          {showSidebar && <Sidebar />}
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  )
}
