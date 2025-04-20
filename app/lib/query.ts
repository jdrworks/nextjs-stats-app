import { PrismaClient } from '@/generated/prisma'
import { z } from 'zod';

const prisma = new PrismaClient()

export const getPlayers = async () => {
    const start = Date.now();

    const result = await prisma.player.findMany({
        orderBy: {
            name: "asc",
        },
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
            deck: true
        }
    });

    return {
        data: result,
        time: Date.now() - start
    }
}
