import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const POST = async (req: Request) => {
    const body = await req.json()
    const { identifier, password } = body

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

    if(!user || !user.password) {
        return NextResponse.json(
            { message: "User not found"},
            { status: 404 }
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return NextResponse.json(
            { message: "Incorrect Password"},
            { status: 401 }
        )
    }


    return NextResponse.json(
        { message: "User logged in successfully"},
        { status: 200 }
    )
    
}

export { POST }