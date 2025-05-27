'use client';

import React, { useActionState } from "react";
import { FormState } from "@/app/lib/types";
import { signIn } from "@/app/lib/actions/auth";
import { Button } from "@/app/components/forms/button";
import { FormInput } from "@/app/components/forms/form-input";

export function SignInForm() {
    const initialState: FormState = { message: null, errors: {}, status: 'default' };
    const [state, dispatch] = useActionState(signIn, initialState);

    return (
        <form action={dispatch}>
            <FormInput index={0} label="Email" name="email" state={state} />
            <FormInput index={0} label="Password" name="password" state={state} type="password" />
            <div className="flex-grow flex justify-end mt-5">
                <Button type="submit">Sign In</Button>
            </div>
        </form>
    );
}
