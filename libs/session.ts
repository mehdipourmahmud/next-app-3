import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { createUser } from "../libs/actions"; // Import the function to create a new user.
import { getUserQuery } from "@/graphql";

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
      const { email, name, image } = user;
      
      // Check if the user already exists in your database using the email.
      // If the user does not exist, create a new user using the provided details.
      const existingUser = await getUserQuery(email);
      if (!existingUser) {
        const newUser = {
          name,
          email,
          avatarUrl: image,
        };
        await createUser(newUser); // Create the new user.
      }

      return true;
    },
  },
}
