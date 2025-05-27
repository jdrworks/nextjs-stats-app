'use server';

import { GameResult, Prisma, PrismaClient } from "@/generated/prisma";
import PrismaPromise = Prisma.PrismaPromise;
import GameResultUncheckedCreateInput = Prisma.GameResultUncheckedCreateInput;
import GameResultUncheckedUpdateInput = Prisma.GameResultUncheckedUpdateInput;
import { FormState } from "@/app/lib/types";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

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
