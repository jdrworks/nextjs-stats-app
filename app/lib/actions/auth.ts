'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { FormState } from "@/app/lib/types";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const UserSchema = z.object({
    email: z.string().email().nonempty({message: "Password is required."}),
    password: z.string().nonempty({message: "Password is required."}),
});

const SignInUser = UserSchema;

export async function signIn(prevState: FormState, formData: FormData): Promise<FormState>  {
    const validatedFields = SignInUser.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Sign In.',
            status: 'error',
        }
    }

    try {
        await auth.api.signInEmail({
            body: {
                email: validatedFields.data.email,
                password: validatedFields.data.password,
            }
        });
    } catch {
        return {
            errors: null,
            message: 'Unable to Sign In.',
            status: 'error',
        }
    }


    revalidatePath(`/`);
    redirect(`/`);
}

export async function signOut(): Promise<FormState> {
    try {
        await auth.api.signOut({
            headers: await headers()
        });
    } catch {
        return {
            errors: null,
            message: 'Could Not Sign Out.',
            status: 'error',
        }
    }

    revalidatePath(`/`);
    redirect(`/`);
}
