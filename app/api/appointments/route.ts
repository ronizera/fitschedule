import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

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