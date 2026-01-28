import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export async function GET(){
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    const user = await getSession(sessionId)

    if(!user) {
        return NextResponse.json(
            {error: "Nao autenticado"},
            {status: 401}
        )
    }

    return NextResponse.json(
        {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,

            }
        },
       
    )
}