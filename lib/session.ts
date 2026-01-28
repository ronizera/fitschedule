import { prisma } from "./prisma"

export async function getSession(sessionId: string | undefined) {
  // 🔥 proteção CRÍTICA
  if (!sessionId || typeof sessionId !== "string") {
    return null
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  })

  if (!session) {
    return null
  }

  if (session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

export async function createSession(userId: string) {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
  })

  return session.id
}

export async function deleteSession(sessionId: string | undefined) {
  if (!sessionId) return

  await prisma.session.delete({
    where: { id: sessionId },
  })
}