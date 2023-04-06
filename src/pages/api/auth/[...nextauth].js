import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        };
      }
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return (profile.email_verified && profile.hd === 'dons.usfca.edu'); // TODO: access denied page
    }
  }
});
