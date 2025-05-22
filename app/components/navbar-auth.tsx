'use server';

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import React from "react";
import Link from "next/link";
import { SignOutForm } from "@/app/components/forms/signout";


export async function NavbarAuth() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
        session ?
            <>
                <span className="text-slate-300">Welcome {session.user.name}</span>
                <SignOutForm />
            </>
        :
            <Link
                href="signin"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
                Sign In
            </Link>
    )
}
