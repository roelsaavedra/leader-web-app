import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Add this new callbacks section below the secret
  callbacks: {
    async session({ session, token }) {
      // This ensures that the user's email is always available in the session
      if (token && session.user) {
        session.user.email = token.email;
      }
      return session;
    }
  }
});
