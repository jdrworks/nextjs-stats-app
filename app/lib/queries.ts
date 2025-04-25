import { PrismaClient } from '@/generated/prisma'
import { z } from 'zod';
import { deckInclude, gameInclude, playerInclude } from "@/app/lib/types";

const prisma = new PrismaClient()

export const fetchPlayers = async () => {
    return prisma.player.findMany({
        orderBy: {
            name: 'asc'
        },
        include: playerInclude
    });
}

export const fetchPlayer = async (id: number) => {
    return prisma.player.findUniqueOrThrow({
        where: {
            id: z.coerce.number().parse(id)
        },
        include: playerInclude
    })
}

export const fetchGames = async () => {
    return prisma.game.findMany({
        orderBy: {
            datetime: 'desc'
        },
        include: gameInclude
    });
}

export const fetchGame = async (id: number) => {
    return prisma.game.findUniqueOrThrow({
        where: {
            id: z.coerce.number().parse(id)
        },
        include: gameInclude
    })
}

export const fetchDecks = async () => {
    return prisma.deck.findMany({
        orderBy: {
            name: 'asc'
        },
        include: deckInclude
    })
}

export const fetchDeck = async (id: number) => {
    return prisma.deck.findUniqueOrThrow({
        where: {
            id: z.coerce.number().parse(id)
        },
        include: deckInclude
    })
}
