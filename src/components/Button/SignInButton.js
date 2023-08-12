'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function SignInButton ({ callbackUrl }) {
  return (
    <Link href='#' onClick={() => signIn('google', { callbackUrl })}>
      <Image
        src="/logo.svg"
        alt="Cue Logo"
        width={90}
        height={90}
        priority
      />
    </Link>
  )
}
