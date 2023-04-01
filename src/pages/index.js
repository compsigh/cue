// Next imports
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'

// Style imports
import styles from '@/styles/Home.module.css'
import { Patrick_Hand } from '@next/font/google'
const patrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <>
      <Head>
        <title>Cue</title>
        <meta name="description" content="Study with AI-powered active recall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.center}>
          <h1 className={patrickHand.className}>Cue</h1>
        </div>
          <Link href='#' onClick={() => signIn('google', { callbackUrl: '/profile' })}>
            <Image
              src="logo.svg"
              alt="Cue Logo"
              width={90}
              height={90}
              priority
            />
          </Link>

      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);

  if (session)
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    };

  return {
    props: {
      session
    }
  };
}
