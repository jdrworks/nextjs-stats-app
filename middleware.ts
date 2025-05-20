import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/game/new', '/game/:slug/edit',
        '/deck/new', '/deck/:slug/edit',
        '/player/new', '/player/:slug/edit',
    ],
}
