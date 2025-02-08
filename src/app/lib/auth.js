import { connectDB } from "@/lib/MongoConfig";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import adminLogin from "../Models/adminLogin";
import NextAuth from "next-auth";

export const NextAuth = {

    providers:[
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                //name:{label: "Name",type: "text"},
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const AdminLogin = await adminLogin.findOne({email:credentials?.email}).select("+password");

                if(!AdminLogin)
                {
                    throw new Error("Wrong Email");
                }
                
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    AdminLogin.password
                )

                if(!passwordMatch)
                {
                    throw new Error("Wrong Password");
                }

                return AdminLogin;
            },
        })
    ],

    session: {
        strategy: "jwt",  // Json Web Token
        maxTimePeriod: 30 * 24 * 60 * 60, // 30 days session lifetime  -> Format(Days * Hours * Minutes * Seconds)
    },

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        async session({ session, token }) {
          session.user.id = token.id;
          return session;
        },
      },
};