import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    if (process.env.EMAIL && process.env.PASSWORD && process.env.USERNAME) {
        return auth.api.signUpEmail({
            body: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
                name: process.env.USERNAME,
            },
            asResponse: true
        });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
