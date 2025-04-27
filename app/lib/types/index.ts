import { Prisma } from '@/generated/prisma';
import { deckInclude, gameInclude, gameResultsInclude, playerInclude } from "@/app/lib/queries";

// Define a consistent deck type with relations
export const playerWithRelations = {
    include: playerInclude
} satisfies Prisma.PlayerDefaultArgs

export const deckWithRelations = {
    include: deckInclude
} satisfies Prisma.DeckDefaultArgs

export const gameResultWithRelations = {
    include: gameResultsInclude
} satisfies Prisma.GameResultDefaultArgs

export const gameResultWithPlayer = {
    include: {
        player: true,
    }
} satisfies Prisma.GameResultDefaultArgs

export const gameWithRelations = {
    include: gameInclude,
} satisfies Prisma.GameDefaultArgs

// Create a type from this validator
export type PlayerWithRelations = Prisma.PlayerGetPayload<typeof playerWithRelations>
export type DeckWithRelations = Prisma.DeckGetPayload<typeof deckWithRelations>
export type GameResultWithRelations = Prisma.GameResultGetPayload<typeof gameResultWithRelations>
export type GameResultWithPlayer = Prisma.GameResultGetPayload<typeof gameResultWithPlayer>
export type GameWithRelations = Prisma.GameGetPayload<typeof gameWithRelations>
