'use server';

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {Prisma, PrismaClient} from '@/generated/prisma'
import deck_gameCreateManyInput = Prisma.deck_gameCreateManyInput;
import { DateTime } from 'luxon';
import {z} from "zod";

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
    const newGame = await prisma.game.create({
        data: {
            datetime: DateTime.now().toSeconds(),
        }
    });
    const deck_games: deck_gameCreateManyInput[] = [];
    formData.getAll('player')?.map((player, index) => {
        deck_games[index] = {
            game_id: newGame.id,
            player_id: 0,
            deck_id: 0,
            position: 0,
        };
        deck_games[index]['player_id'] = z.coerce.number().parse(player);
    });
    formData.getAll('deck')?.map((deck, index) => {
        deck_games[index]['deck_id'] = z.coerce.number().parse(deck);
    })
    formData.getAll('position')?.map((position, index) => {
        deck_games[index]['position'] = z.coerce.number().parse(position);
    })

    await prisma.deck_game.createMany({
        data: deck_games
    });

    revalidatePath('/games');
    redirect('/games');

    return prevState;
}
