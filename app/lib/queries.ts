import {Prisma, PrismaClient} from '@/generated/prisma'
import {z} from 'zod';
import {GameFormRow} from "@/app/components/forms/game";
import deck_gameCreateManyInput = Prisma.deck_gameCreateManyInput;

const prisma = new PrismaClient()

export const getPlayers = async () => {
    const start = Date.now();

    const result = await prisma.player.findMany({
        orderBy: {
            name: "asc",
        },
        include: {
            deck_game: true
        }
    });

    return {
        data: result,
        time: Date.now() - start
    }
}

export const getPlayer = async (id: number) => {
    const start = Date.now();

    const result = await prisma.player.findUnique({
        where: {
            id: z.coerce.number().parse(id)
        },
        include: {
            deck: {
                include: {
                    deck_game: true
                }
            },
            deck_game: {
                include: {
                    game: {
                        include: {
                            deck_game: true
                        }
                    }
                }
            }
        }
    });

    return {
        data: result,
        time: Date.now() - start
    }
}

export const fetchPlayers = async () => {
    return prisma.player.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            deck: {
                orderBy: {
                    name: 'asc'
                }
            }
        }
    });
}

export const fetchGames = async () => {
    return prisma.game.findMany({
        orderBy: {
            datetime: 'desc'
        },
        include: {
            deck_game: {
                include: {
                    player: true,
                    deck: true
                }
            }
        }
    });
}
export const fetchGame = async (id: number) => {
    return prisma.game.findUnique({
        where: {
            id: z.coerce.number().parse(id)
        },
        include: {
            deck_game: true
        }
    })
}
