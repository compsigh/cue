import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      {Component.name !== 'Home' && <Sidebar />}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
