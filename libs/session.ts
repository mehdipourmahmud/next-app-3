import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "../libs/actions";
import { SessionInterface,UserProfile } from "@/common.types";

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
    async session({ session }) {
      const email = session?.user?.email as string;

      try { 
        const data = await getUser(email) as { user?: UserProfile }

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }) {
      const { email, name, image, id } = user;
      const existingUser = await getUser(email);
      const userExists = !!existingUser.user; // Convert to boolean here

      if (!userExists) {
        try {
          await createUser(name as string, email as string, image as string);
        } catch (error) {
          console.log('Error while creating user:', error.message);
     
        }
      }
  
      const updatedUser = { ...user, id };
      return { ...updatedUser };
    },
  },
  
  
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;
  return session;
}



