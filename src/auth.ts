import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
// import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                identifier: {
                    label: "Email or Username",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if(!credentials?.identifier || !credentials.password) {
                    return null
                }

                const identifier = String(credentials.identifier)
                const password = String(credentials.password)

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: {
                                equals: identifier.trim(),
                                mode: "insensitive"
                            }},
                            {
                                username: {
                                    equals: identifier.trim(),
                                    mode: "insensitive"
                                }
                            }
                        ]
                    }
                })

                if(!user) {
                    return null
                }
            
                const isPasswordValid = await bcrypt.compare(password, user.password)
            
                if(!isPasswordValid) {
                    return null
                }
            
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
            }
        })
    ],

    session: { strategy: "jwt"},
    pages: { signIn: "/login"}
})