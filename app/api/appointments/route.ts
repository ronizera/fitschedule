import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/session"
import { json } from "stream/consumers"

// BUSCAR AGENDAMENTOS DO USUÁRIO LOGADO
export async function GET() {
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
}

// CRIAR AGENDAMENTO
export async function POST(req: Request) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  const user = await getSession(sessionId)

  if (!user) {
    return NextResponse.json(
      { error: "Não autenticado" },
      { status: 401 }
    )
  }

  const body = await req.json()
  const { date } = body

  if (!date) {
    return NextResponse.json(
      { error: "Data é obrigatória" },
      { status: 400 }
    )
  }

  const appointment = await prisma.appointment.create({
    data: {
      userId: user.id,
      date: new Date(date),
    },
  })

  return NextResponse.json(appointment, { status: 201 })
}
// cancelar agendamento
export async function DELETE(req: Request) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  const user = await getSession(sessionId)

  if(!user) {
    return NextResponse.json(
      {error: "Nao autenticado"},
      {status: 401}
    )
  }

  const {searchParams} = new URL(req.url)
  const appointmentId = searchParams.get("id")

  if(!appointmentId){
    return NextResponse.json(
      {error: "ID do agendamento nao informado"},
      {status: 400}
    )
  }

  //vamos garantir que o agendamento pertence ao usuario

  const appointment = await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      userId: user.id,
    }
  })

  if(!appointment) {
    return NextResponse.json(
      {error: "Agendamento nao encontrado"},
      {status: 404}
    )
  }

  await prisma.appointment.delete({
    where:{
      id: appointmentId,
    }
  })

  return NextResponse.json({sucess: true})

  
}
