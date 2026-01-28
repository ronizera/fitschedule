import bcrypt from "bcrypt"
import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createSession } from "@/lib/session"


export async function POST(request: Request){
    try{
        const body = await request.json()
        const {email, password} = body

        if(!email || !password){
            return NextResponse.json(
                {error: "Email e senha sao obrigatorios"},
                {status: 400}
            )
        }

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            return NextResponse.json(
                {error: "Email ou senha invalidos"},
                {status: 401}
            )
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash)

        if(!passwordMatch){
            return NextResponse.json(
                {error: "Email ou senha invalido"},
                {status: 401}
            )
        }

        const sessionId = await createSession(user.id)

        const response = NextResponse.json(
            {message: "Login realizado com sucesso"},
            {status: 200}
        )

        response.cookies.set("sessionId", sessionId, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })

        return response


    }catch {
        return NextResponse.json(
            {error: "Erro interno no servidor"},
            {status: 500}
        );
    }
}

