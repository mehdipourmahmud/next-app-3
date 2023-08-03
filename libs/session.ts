import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "../libs/actions"; // Import the function to create a new user.
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.Google_CLIENT_ID!,
      clientSecret: process.env.Google_CLIENT_SECRET!,
      
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async signIn({ user }) {
      const { email, name, image, id } = user; // Include the "id" field here
      const existingUser = await getUser(email);
      console.log(existingUser, 'res')
      if (!existingUser.user) {
        await createUser(user.name as string, user.email as string, user.image as string);
      }
    },
  
  },
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;
  return session;
}
