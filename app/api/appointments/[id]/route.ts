import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    console.log("DELETE PARAM ID:", id)

    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value
    console.log("SESSION ID:", sessionId)

    const user = await getSession(sessionId)

    if (!user) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      )
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    console.log("APPOINTMENT FOUND:", appointment)

    if (!appointment) {
      return NextResponse.json(
        { error: "Agendamento não encontrado" },
        { status: 404 }
      )
    }

    await prisma.appointment.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("DELETE ERROR:", err)
    return NextResponse.json(
      { error: "Erro ao cancelar agendamento" },
      { status: 500 }
    )
  }
}
