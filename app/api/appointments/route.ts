import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/session"

// CRIAR AGENDAMENTO
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    const user = await getSession(sessionId)

    if (!user) {
      return NextResponse.json(
        { error: "Não autenticado" },
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

    if (appointmentDate <= new Date()) {
      return NextResponse.json(
        { error: "Não é possível agendar no passado" },
        { status: 400 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        date: appointmentDate,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    )
  }
}

// BUSCAR AGENDAMENTOS DO USUÁRIO
export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    const user = await getSession(sessionId)

    if (!user) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      )
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(appointments)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos" },
      { status: 500 }
    )
  }
}
