import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/Sidebar/Sidebar'
import '@/styles/globals.scss'
import { Patrick_Hand } from '@next/font/google'
const patrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' });

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <main className={patrickHand.className}>
      <SessionProvider session={session}>
        {Component.name !== 'Home' && <Sidebar />}
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
