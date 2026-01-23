import {prisma} from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

type Params = {
    params: {
        id: string
    }
}

export async function DELETE(
    req: Request,
    {params}: Params
) {
    try{
        const cookieStore = await cookies()
        const sessionId = cookieStore.get("sessionId")?.value

        const user = await getSession(sessionId)

        if(!user) {
            return NextResponse.json(
                {error: "Nao autorizado"},
                {status: 401}

            )

        }

        const appointmentId = params.id

        const appointment = await prisma.appointment.findUnique({
            where: {id: appointmentId}
        })

        if(!appointment) {
            return NextResponse.json(
                {error: "Agendamento nao encontrado"},
                {status: 404}
            )
        }

        if(appointment.userId !== user.id) {
            return NextResponse.json(
                {error: "Acesso negado"},
                {status: 403}
            )
        } 

        return NextResponse.json(
            {message: "Agendamento cancelado"},
            {status: 200}
        )
    }catch{
        return NextResponse.json(
            {error: "Erro ao deletar agendamento"},
            {status: 500}
        )
    }
}