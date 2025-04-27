import React from "react";
import { DeckRow } from "@/app/components/deck-row";
import { DeckWithRelations } from "@/app/lib/types";

export function DeckTable({ decks, showPlayers }: {
    decks: DeckWithRelations[],
    showPlayers?: boolean,
}) {

    return (
        <table className="w-full">
            <thead className="font-bold border-b-2 border-gray-200 text-left">
            <tr>
                <th>Name</th>
                {showPlayers && (
                    <th>Owner</th>
                )}
                <th>Wins</th>
                <th>Losses</th>
                <th>Win Rate</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {decks.map((deck) => (
                    <DeckRow key={deck.id} deck={deck} showPlayer={showPlayers} />
                ))}
            </tbody>
        </table>
    );
}
