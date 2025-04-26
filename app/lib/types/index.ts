import { Prisma } from '@/generated/prisma';
import { fetchDeck, fetchDecks, fetchGame, fetchGames, fetchPlayer, fetchPlayers } from "@/app/lib/queries";

export const playerInclude = {
    deck: {
        orderBy: {
            name: 'asc'
        },
        include: {
            deck_game: {
                include: {
                    game: {
                        include: {
                            deck_game: true
                        }
                    }
                }
            },
            player: true,
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
} satisfies Prisma.playerInclude

export const deckInclude = {
    player: true,
    deck_game: {
        include: {
            game: {
                include: {
                    deck_game: true
                }
            }
        }
    }
} satisfies Prisma.deckInclude

export const gameInclude = {
    deck_game: {
        include: {
            player: true,
            deck: true
        }
    }
} satisfies Prisma.gameInclude

export type PlayersWithDeckGame = Prisma.PromiseReturnType<typeof fetchPlayers>
export type PlayerWithDeckGame = Prisma.PromiseReturnType<typeof fetchPlayer>
export type GamesWithDeckGame = Prisma.PromiseReturnType<typeof fetchGames>
export type GameWithDeckGame = Prisma.PromiseReturnType<typeof fetchGame>
export type DecksWithDeckGame = Prisma.PromiseReturnType<typeof fetchDecks>
export type DeckWithDeckGame = Prisma.PromiseReturnType<typeof fetchDeck>
export type DeckGameWithGames = Prisma.deck_gameGetPayload<{
    include: {
        game: {
            include: {
                deck_game: true
            }
        }
    }
}>
export type DeckGame = {
    id: number,
    game_id: number,
    deck_id: number,
    player_id: number,
    position: number,
    game: {
        id: number,
        datetime: number,
        deck_game: {
            id: number,
            game_id: number,
            deck_id: number,
            player_id: number,
            position: number,
        }
    }
}

export type Deck = {
    id: number,
    player_id: number,
    name: string,
    deck_game: {
        id: number,
        game_id: number,
        deck_id: number,
        player_id: number,
        position: number,
        game: {
            id: number,
            datetime: number,
            deck_game?: {
                id: number,
                game_id: number,
                deck_id: number,
                player_id: number,
                position: number,
            }[]
        } | null
    }[],
    player: {
        id: number,
        name: string,
    } | null
}
