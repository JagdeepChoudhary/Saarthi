/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import { User } from "@/model/User";
import { comparePassword } from "@/utils/hashPassword";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          // console.log(credentials);
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            throw new Error("User password is missing");
          }
          const isPasswordCorrect = await comparePassword(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            console.log("Password is Incorrect");
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     await dbConnect();
    //     const existingUser = await User.findOne({ email: profile?.email });

    //     if (!existingUser) {
    //       await User.create({
    //         email: profile?.email,
    //         name: profile?.name,
    //         image: profile?.image,
    //         password: null, // No password for Google users
    //         loginType: "google",
    //       });
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString(); // Convert ObjectId to string
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
