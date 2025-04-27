'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GameResult, Prisma, PrismaClient } from '@/generated/prisma'
import { z } from "zod";
import PrismaPromise = Prisma.PrismaPromise;
import GameResultUncheckedCreateInput = Prisma.GameResultUncheckedCreateInput;
import GameResultUncheckedUpdateInput = Prisma.GameResultUncheckedUpdateInput;

const prisma = new PrismaClient()

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createGame(prevState: State, formData: FormData) {
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

export async function updateGame(prevState: State, formData: FormData) {
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

export async function createDeck(prevState: State, formData: FormData) {
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

export async function updateDeck(prevState: State, formData: FormData) {
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
