'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma, PrismaClient} from '@/generated/prisma'
import deck_gameCreateManyInput = Prisma.deck_gameCreateManyInput;
import { DateTime } from 'luxon';
import { z } from "zod";

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

export async function updateGame(prevState: State, formData: FormData) {
    const deck_games: deck_gameCreateManyInput[] = [];
    const game_id = formData.get('game');
    formData.getAll('player')?.map((player, index) => {
        deck_games[index] = {
            game_id: z.coerce.number().parse(game_id),
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
    formData.getAll('id')?.map((id, index) => {
        deck_games[index]['id'] = z.coerce.number().parse(id);
    })

    await Promise.all(deck_games.map(async (deck_game) => {
        await prisma.deck_game.update({
            where: {
                id: deck_game.id
            },
            data: {
                player_id: deck_game.player_id,
                deck_id: deck_game.deck_id,
                position: deck_game.position
            }
        });
    }));

    revalidatePath('/games');
    redirect('/games');

    return prevState;
}

export async function createDeck(prevState: State, formData: FormData) {
    const playerId = z.coerce.number().parse(formData.get('player'));
    const name = z.coerce.string().parse(formData.get('name'));
    const deck = await prisma.deck.create({
        data: {
            player_id: playerId,
            name: name,
        }
    });

    revalidatePath(`/deck/${deck.id}`);
    redirect(`/deck/${deck.id}`);

    return prevState;
}

export async function updateDeck(prevState: State, formData: FormData) {
    const deckId = z.coerce.number().parse(formData.get('deck'));
    const playerId = z.coerce.number().parse(formData.get('player'));
    const name = z.coerce.string().parse(formData.get('name'));
    const deck = await prisma.deck.update({
        where: {
            id: deckId,
        },
        data: {
            player_id: playerId,
            name: name,
        }
    });

    revalidatePath(`/deck/${deck.id}`);
    redirect(`/deck/${deck.id}`);

    return prevState;
}
