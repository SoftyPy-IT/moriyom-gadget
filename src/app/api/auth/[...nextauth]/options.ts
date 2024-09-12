/* eslint-disable no-unused-vars */
import { baseURL } from "@/redux/api/baseApi";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomeSession = {
  user?: CustomUser;
  expires: string;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
  expires?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await axios.post(
            `${baseURL}/auth/login`,
            credentials,
          );
          if (data.success && data.data.user) {
            const user = {
              id: data.data.user._id,
              name: `${data.data.user.firstName} ${data.data.user.lastName}`,
              email: data.data.user.email,
              image: data.data.user.avatar?.url || null,
              token: data.data.accessToken,
            };
            return user;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: CustomeSession;
      user: CustomUser;
      token: JWT;
    }) {
      session.user = token.user as CustomUser;
      session.expires = token.exp as string;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.user = user;
        token.accessToken = user.token;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
