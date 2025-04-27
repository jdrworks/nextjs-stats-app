import { PrismaClient } from '@/generated/prisma'
import { z } from 'zod';

const prisma = new PrismaClient()

export const gameInclude = {
    gameResults: {
        include: {
            player: true,
            deck: true,
        }
    }
}

export const subGameResultsInclude = {
    gameResults: {
        include: {
            player: true,
        }
    }
}

export const gameResultsInclude = {
    game: {
        include: subGameResultsInclude,
    },
    deck: true,
}

export const deckInclude = {
    gameResults: {
        include: gameResultsInclude
    },
    player: true,
}

export const playerInclude = {
    gameResults: {
        include: gameResultsInclude
    },
    decks: {
        include: deckInclude
    },
}

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
            id: z.coerce.number().parse(id),
        },
        include: playerInclude
    })
}

export const fetchDecks = async () => {
    return prisma.deck.findMany({
        orderBy: {
            name: 'asc',
        },
        include: deckInclude,
    })
}

export const fetchDeck = async (id: number) => {
    return prisma.deck.findUniqueOrThrow({
        where: {
            id: z.coerce.number().parse(id),
        },
        include: deckInclude,
    })
}

export const fetchGames = async () => {
    return prisma.game.findMany({
        orderBy: {
            datetime: 'desc',
        },
        include: gameInclude
    })
}

export const fetchGame = async (id: number) => {
    return prisma.game.findUniqueOrThrow({
        where: {
            id: z.coerce.number().parse(id),
        },
        include: gameInclude
    })
}
