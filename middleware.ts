import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const sessionId = request.cookies.get("sessionId")?.value


    if(!sessionId) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"]
}