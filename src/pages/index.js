import Head from 'next/head'
import Image from 'next/image'
import { Patrick_Hand } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
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
      <Sidebar></Sidebar>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="https://cue.study"
              target="_blank"
              rel="noopener noreferrer"
            >
              {}
              <Image
                src="/cue.svg"
                alt="Cue Logo"
                className={styles.vercelLogo}
                width={25}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
        <h2 className={patrickHand.className}>
              Cue 
            </h2>
            <hr/>
        <div className={styles.thirteen}>
        <a href="https://cue.study" className={styles.button}>

          <Image
            src="/cue.svg"
            alt="Cue Logo"
            width={90}
            height={90}
            priority
          />
          </a>
        </div>

</div>

      </main>
    </>
  )
}


