'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GameResult, Prisma, PrismaClient } from '@/generated/prisma'
import { z } from "zod";
import PrismaPromise = Prisma.PrismaPromise;
import GameResultUncheckedCreateInput = Prisma.GameResultUncheckedCreateInput;
import GameResultUncheckedUpdateInput = Prisma.GameResultUncheckedUpdateInput;
import { FormState } from "@/app/lib/types";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient()

const PlayerSchema = z.object({
    id: z.number(),
    name: z.string().nonempty({message: "Player Name is required."}),
});

const CreatePlayer = PlayerSchema.omit({ id: true })

const UserSchema = z.object({
    email: z.string().email().nonempty({message: "Password is required."}),
    password: z.string().nonempty({message: "Password is required."}),
});

const SignInUser = UserSchema;

export async function createGame(prevState: FormState, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/signin");
    }
    const newGame = await prisma.game.create({});
    const gameResults: GameResultUncheckedCreateInput[] = [];
    formData.getAll('playerId')?.map((playerId, index) => {
        gameResults[index] = {
            deckId: 0,
            gameId: newGame.id,
            playerId: 0,
            position: 0,
        };
        gameResults[index]['playerId'] = z.coerce.number().parse(playerId);
    });
    formData.getAll('deckId')?.map((deckId, index) => {
        gameResults[index]['deckId'] = z.coerce.number().parse(deckId);
    })
    formData.getAll('position')?.map((position, index) => {
        gameResults[index]['position'] = z.coerce.number().parse(position);
    })

    await prisma.gameResult.createMany({
        data: gameResults
    });

    revalidatePath('/games');
    redirect('/games');

    return prevState;
}

export async function updateGame(prevState: FormState, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect("/signin");
    }
    const gameResults: GameResultUncheckedUpdateInput[] = [];
    const gameId = formData.get('gameId');
    formData.getAll('playerId')?.map((playerId, index) => {
        gameResults[index] = {
            deckId: 0,
            gameId: z.coerce.number().parse(gameId),
            id: 0,
            playerId: 0,
            position: 0,
        };
        gameResults[index]['playerId'] = z.coerce.number().parse(playerId);
    });
    formData.getAll('deckId')?.map((deckId, index) => {
        gameResults[index]['deckId'] = z.coerce.number().parse(deckId);
    })
    formData.getAll('position')?.map((position, index) => {
        gameResults[index]['position'] = z.coerce.number().parse(position);
    })
    formData.getAll('id')?.map((id, index) => {
        gameResults[index]['id'] = z.coerce.number().parse(id);
    })

    const transactionQueries: PrismaPromise<GameResult>[] = [];
    gameResults.map(async (gameResult: GameResultUncheckedUpdateInput) => {
        transactionQueries.push(
            prisma.gameResult.update({
                where: {
                    id: z.coerce.number().parse(gameResult.id)
                },
                data: gameResult,
            })
        );
    })

    await prisma.$transaction(transactionQueries);

    revalidatePath('/games');
    redirect('/games');

    return prevState;
}

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
