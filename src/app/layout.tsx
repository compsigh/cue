// Component imports
import { AuthWrapper } from '../components/AuthWrapper'

// Style imports
import '@/styles/globals.scss'
import { Patrick_Hand, Public_Sans, Patrick_Hand_SC, Roboto_Mono } from 'next/font/google'

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-patrick-hand'
})

const patrickHandSC = Patrick_Hand_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-patrick-hand-sc'
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-public-sans'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-roboto-mono'
})

export const metadata = {
  title: 'Cue',
  description: 'Study with AI-powered Active Recall'
}

export default function RootLayout ({ children }) {
  return (
    <AuthWrapper>
      <html lang="en" className={`${patrickHand.variable} ${patrickHandSC.variable} ${publicSans.variable} ${robotoMono.variable}`}>
        <body>
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthWrapper>
  )
}
