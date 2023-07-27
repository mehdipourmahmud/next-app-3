// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options = {
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.Google_CLIENT_ID,
      clientSecret: process.env.Google_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST }

