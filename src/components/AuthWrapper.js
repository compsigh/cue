'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthWrapper ({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}
