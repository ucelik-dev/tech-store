import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";
import { NextAuthOptions, User } from "next-auth";
import { compare } from 'bcryptjs'

declare module "next-auth" {
    interface Session {
        user: User & { isAdmin: Boolean }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: Boolean,
        name: string
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            credentials: {
              email: {},
              password: {}
            },
            async authorize(credentials, req) {
                
                if(!credentials?.email || !credentials?.password) { return null; }
                const existingUser = await prisma.user.findUnique({ where: { email: credentials?.email } });
                if(!existingUser) { return null; }
                const passwordMatch = await compare(credentials.password, existingUser.password!);
                
                if(passwordMatch) { 
                    return {
                        id:`${existingUser.id}`,
                        email: existingUser.email,
                    } 
                }

                return null;
             
            }
          })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn:'/signIn'
    },
    callbacks: {
        async session({token, session}) {
            if(token){
                session.user.isAdmin = token.isAdmin
                session.user.name = token.name
            }
            return session
        },
        async jwt({token}) {
            const userInDb = await prisma.user.findUnique({
                where: { email: token.email! }
            })
            token.isAdmin = userInDb?.isAdmin!
            token.name = userInDb?.name!
            return token;
        }
    }
}