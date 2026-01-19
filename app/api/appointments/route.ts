import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



//criacao da api de agendamento
export async function POST(req: Request) {
    try{
        const body = await req.json()
        const {userId, date} = body

        if (!userId || !date) {
            return NextResponse.json(
                {error: "Dados obrigatórios faltando"},
                {status: 400}
            )
        }

        const appointment = await prisma.appointment.create({
            data: {
                userId,
                date: new Date(date),
            }
        })

        return NextResponse.json(appointment, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao criar agendamento"},
            {status: 500}
        )
    }   
}


//buscar agendamentos do usuário
export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")

    if(!userId) {
        return NextResponse.json(
            {error: "Usuario nao informados"},
            {status: 400}
        )
    }

    const appointments = await prisma.appointment.findMany({
        where: {userId},
        orderBy: {date: "asc"}
    })
}