import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import Card from "@/app/components/card";
import {fetchPlayers} from "@/app/lib/query";
import Dropdown, { dropdownConfig, dropdownOption, dropdownOptionGroup} from "@/app/components/dropdown";
import Button from "@/app/components/button";
import {GameAddForm} from "@/app/components/forms/game";

export const metadata: Metadata = {
    title: "Magic Stats",
    description: "GUI for interacting with Magic Stats",
};

export default async function Page() {
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

    return (
        <Header text={`New Game`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <GameAddForm playerConfig={playerDropdownConfig} deckConfig={deckDropdownConfig}  />
                </Card>
            </div>
        </Header>
    );
}
