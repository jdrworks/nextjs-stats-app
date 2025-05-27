'use server';

import { FormState } from "@/app/lib/types";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

export async function createDeck(prevState: FormState, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/signin");
    }
    const playerId = z.coerce.number().parse(formData.get('playerId'));
    const name = z.coerce.string().parse(formData.get('name'));
    const deck = await prisma.deck.create({
        data: {
            playerId: playerId,
            name: name,
        }
    });

    revalidatePath(`/deck/${deck.id}`);
    redirect(`/deck/${deck.id}`);

    return prevState;
}

export async function updateDeck(prevState: FormState, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/signin");
    }
    const deckId = z.coerce.number().parse(formData.get('deckId'));
    const playerId = z.coerce.number().parse(formData.get('playerId'));
    const name = z.coerce.string().parse(formData.get('name'));
    const deck = await prisma.deck.update({
        where: {
            id: deckId,
        },
        data: {
            playerId: playerId,
            name: name,
        }
    });

    revalidatePath(`/deck/${deck.id}`);
    redirect(`/deck/${deck.id}`);

    return prevState;
}
