import {prisma} from "./prisma"

export async function getSession(sessionId: string | undefined) {
    if(!sessionId) {
        return null;
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
        include: {
            user: true,
        },
    });

    if(!session) {
        return null
    }

    const isExpired = session.expiresAt < new Date();

    if(isExpired) {
        await prisma.session.delete({ where: { id: session.id } })
        return null
    }

    return session.user
}

export async function createSession(userId: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const session = await prisma.session.create({
        data: {
            userId, expiresAt
        }
    })

    return session.id
}

export async function deleteSession(sessionId: string | undefined) {
    if(!sessionId){
        return
    }

    await prisma.session.deleteMany({
        where: {
            id: sessionId
        }
    })
}


