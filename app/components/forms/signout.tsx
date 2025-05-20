'use client';

import React, { useActionState } from "react";
import { FormState } from "@/app/lib/types";
import { signOut } from "@/app/lib/actions";

export function SignOutForm() {
    const initialState: FormState = { message: null, errors: {}, status: 'default' };
    const [state, dispatch] = useActionState(signOut, initialState);

    return (
        <form action={dispatch}>
            <button className="ml-3 text-sky-500 hover:underline hover:cursor-pointer" type="submit">Sign Out</button>
        </form>
    );
}
