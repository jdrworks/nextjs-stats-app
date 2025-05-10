
import {fetchGame, fetchPlayers} from "@/app/lib/queries";
import {GameFormRow} from "@/app/components/forms/game";
import { DeckWithRelations, GameWithRelations, PlayerWithRelations, OptionType, GroupType } from "@/app/lib/types";

export async function generatePlayerAndDeckSelectOptions(): Promise<{ playerOptions: OptionType[], deckOptions: GroupType[] }> {
    const players: PlayerWithRelations[] = await fetchPlayers();
    const playerOptions: OptionType[] = [];
    const deckOptionsGroup: GroupType[] = [];
    players.map((player) => {
        playerOptions.push({
            value: player.id,
            label: player.name,
        })
        const deckOptions: OptionType[] = [];
        player.decks.map((deck: DeckWithRelations) => {
            deckOptions.push({
                value: deck.id,
                label: deck.name,
            })
        })
        deckOptionsGroup.push({
            label: player.name,
            options: deckOptions,
        })
    });

    return { playerOptions: playerOptions, deckOptions: deckOptionsGroup };
}

export async function generateGameFormRows(gameId: number): Promise<GameFormRow[]> {
    const game: GameWithRelations = await fetchGame(gameId);
    const gameFormRows: GameFormRow[] = [];

    game.gameResults.map((gameResult) => {
        gameFormRows.push({
            deckId: gameResult.deckId,
            playerId: gameResult.playerId,
            position: gameResult.position,
            id: gameResult.id,
        });
    });

    return gameFormRows;
}
