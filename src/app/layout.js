// Next imports
import AuthWrapper from '../components/AuthWrapper'

// Style imports
import '@/styles/globals.scss'
// import { Patrick_Hand, Patrick_Hand_SC, Public_Sans, Roboto_Mono } from 'next/font/google'
// const patrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' })
// const patrickHandSC = Patrick_Hand_SC({ subsets: ['latin'], weight: '400' })
// const publicSans = Public_Sans({ subsets: ['latin'], style: ['normal', 'italic'] })
// const robotoMono = Roboto_Mono({ subsets: ['latin'], style: ['normal', 'italic'] })
// TODO: fix styles

export const metadata = {
  title: 'Cue',
  description: 'Study with AI-powered Active Recall'
}

export default function RootLayout ({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        {/* <style jsx global>{`
          :root {
            --font-primary: ${publicSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            --font-headers: ${patrickHand.style.fontFamily}, ${publicSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            --font-buttons: ${patrickHandSC.style.fontFamily}, ${patrickHand.style.fontFamily}, ${publicSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            --font-code: ${robotoMono.style.fontFamily}, monospace;
          }
          `}
        </style> */}
        <body>
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthWrapper>
  )
}
