import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    
    if(!isLoggedIn) {
        return Response.redirect(new URL("/login", req.url))
    }
})

export const config ={
    matcher: ["/app/:path*"]
}

