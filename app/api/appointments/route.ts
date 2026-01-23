import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { getSession } from "@/lib/session"
import { NextResponse } from "next/server"

//criar agendamento
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    const user = await getSession(sessionId)

    if (!user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const { date } = await req.json()

    if (!date) {
      return NextResponse.json(
        { error: "Data é obrigatória" },
        { status: 400 }
      )
    }

    const appointmentDate = new Date(date)

    //ver se possui algum conflito
    const conflict = await prisma.appointment.findFirst({
      where: { date: appointmentDate }
    })

    if (conflict) {
      return NextResponse.json(
        { error: "Horário indisponível" },
        { status: 409 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        date: appointmentDate
      }
    })

    return NextResponse.json(appointment, { status: 201 })

  } catch {
    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    )
  }
}
