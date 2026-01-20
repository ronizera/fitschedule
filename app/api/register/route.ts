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

        
    }
}