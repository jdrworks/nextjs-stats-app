import {fetchGame, fetchPlayers} from "@/app/lib/queries";
import {dropdownConfig, dropdownOption, dropdownOptionGroup} from "@/app/components/forms/dropdown";
import {GameFormRow} from "@/app/components/forms/game";

export async function generateDropdownConfig(): Promise<{ playerConfig: dropdownConfig, deckConfig: dropdownConfig }> {
    const players = await fetchPlayers();
    const playerOptions: dropdownOption[] = [];
    const deckOptionsGroup: dropdownOptionGroup[] = [];
    players.map((player) => {
        playerOptions.push({
            value: player.id,
            text: player.name,
        })
        const deckOptions: dropdownOption[] = [];
        player.deck.map((deck) => {
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
        name: 'player',
        options: playerOptions,
        defaultOption: {
            value: 0,
            text: '',
        },
        value: 0
    };
    const deckDropdownConfig: dropdownConfig = {
        label: 'Choose a Deck',
        name: 'deck',
        optionGroups: deckOptionsGroup,
        defaultOption: {
            value: 0,
            text: '',
        },
        value: 0
    }

    return { playerConfig: playerDropdownConfig, deckConfig: deckDropdownConfig };
}

export async function generateGameFormRows(game_id: number): Promise<GameFormRow[]> {
    const game = await fetchGame(game_id);
    const gameFormRows: GameFormRow[] = [];

    game?.deck_game?.map((row) => {
        gameFormRows.push({
            player: row.player_id,
            deck: row.deck_id,
            position: row.position,
            id: row.id,
        });
    });

    return gameFormRows;
}
