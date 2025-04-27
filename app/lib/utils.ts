import {fetchGame, fetchPlayers} from "@/app/lib/queries";
import {dropdownConfig, dropdownOption, dropdownOptionGroup} from "@/app/components/forms/dropdown";
import {GameFormRow} from "@/app/components/forms/game";
import { DeckWithRelations, GameWithRelations, PlayerWithRelations } from "@/app/lib/types";

export async function generateDropdownConfig(): Promise<{ playerConfig: dropdownConfig, deckConfig: dropdownConfig }> {
    const players: PlayerWithRelations[] = await fetchPlayers();
    const playerOptions: dropdownOption[] = [];
    const deckOptionsGroup: dropdownOptionGroup[] = [];
    players.map((player) => {
        playerOptions.push({
            value: player.id,
            text: player.name,
        })
        const deckOptions: dropdownOption[] = [];
        player.decks.map((deck: DeckWithRelations) => {
            deckOptions.push({
                value: deck.id,
                text: deck.name,
            })
        })
        deckOptionsGroup.push({
            text: player.name,
            options: deckOptions,
        })
    });
    const playerDropdownConfig: dropdownConfig = {
        label: 'Choose a Player',
        name: 'playerId',
        options: playerOptions,
        defaultOption: {
            value: 0,
            text: '',
        },
        value: 0
    };
    const deckDropdownConfig: dropdownConfig = {
        label: 'Choose a Deck',
        name: 'deckId',
        optionGroups: deckOptionsGroup,
        defaultOption: {
            value: 0,
            text: '',
        },
        value: 0
    }

    return { playerConfig: playerDropdownConfig, deckConfig: deckDropdownConfig };
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
