import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "../libs/actions";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.Google_CLIENT_ID!,
      clientSecret: process.env.Google_CLIENT_SECRET!,
      scopes: ['openid', 'userinfo.email', 'userinfo.profile'],
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
      const { email, name, image, id } = user;

      console.log(user, 'uu');
      const existingUser = await getUser(email);
      const userExists = !!existingUser.user; // Convert to boolean here
      console.log(userExists,'boo')
      if (!userExists) {      
      const res=   await createUser(name as string, email as string, image as string, id as string);
      console.log(res,'impo')
      }
      user.id = id; // Add the Google ID to the user object
      return true; // Allow sign-in
    },
  },
  
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;
  return session;
}

