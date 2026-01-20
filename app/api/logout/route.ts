import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    if(sessionId){
        await prisma.session.delete({
            where: {id: sessionId}
        })
    }

    const response = NextResponse.json(
        {message: "Logout realizado"},
        {status: 200}
    )

    response.cookies.set("sessionId", "", {
        path: "/",
        maxAge: 0,
    })
    
    return response
    
}