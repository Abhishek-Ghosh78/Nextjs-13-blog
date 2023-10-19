import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/utils/schema";
import connectDB from "@/db/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          connectDB();
          const user = await userModel.findOne({ email: email });
          if (!user) {
            return null;
          }
          const isValidPassword = await bcrypt.compare(
            password,
            user.password!
          );
          if (!isValidPassword) {
            return null;
          }
          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
