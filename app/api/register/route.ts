import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import {prisma} from "@/lib/prisma"


export async function POST(request: Request) {
    try{
        const body = await request.json()

        const {name, email, password} = body


        //validacao

        if(!name || !email || !password){
            return NextResponse.json({
                error: "Dados obrigatorios faltando"
            }, {status: 400})
        }

        //para ver se o email ja existe
        const existingEmail = await prisma.user.findUnique({
            where: {email},
        })

        if(existingEmail){
            return NextResponse.json(
                {error: "Email ja cadastrado"},
                {status: 409}
            )
        }

        // hash da senha

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        //criar usuario
        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            }
        })

        return NextResponse.json(
            {message: "usuario criado com sucesso"},
            {status: 201}
        )

        
    }catch (err){
        return NextResponse.json(
            {error: "Erro interno no servidor"},
            {status: 500}
        )
    }
}