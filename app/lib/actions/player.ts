'use server';

import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";
import { FormState } from "@/app/lib/types";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

const PlayerSchema = z.object({
    id: z.number(),
    name: z.string().nonempty({message: "Player Name is required."}),
});

const CreatePlayer = PlayerSchema.omit({ id: true });

export async function createPlayer(prevState: FormState, formData: FormData): Promise<FormState> {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/signin");
    }
    const validatedFields = CreatePlayer.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Player.',
            status: 'error',
        }
    }

    const { name } = validatedFields.data;

    const player = await prisma.player.create({
        data: {
            name: name,
        }
    });

    revalidatePath(`/player/${player.id}`);
    redirect(`/player/${player.id}`);
}
