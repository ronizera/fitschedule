import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    if(sessionId){
        try{

        
        await prisma.session.delete({
            where: {id: sessionId}
        })
        }catch (e) {
            console.error("Sessao encerrada ou inexistente")
        }
    }

    const url = new URL("/", request.url);
    const response = NextResponse.redirect(url)

    response.cookies.set("sessionId", "", {
        path: "/",
        maxAge: 0,
    })
    
    return response
    
}