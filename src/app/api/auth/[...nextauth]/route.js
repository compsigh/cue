import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile (profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id // might need to be `token` instead of `user`, test this
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
