import React from "react";
import { DeckRow } from "@/app/components/deck-row";
import { DeckWithRelations } from "@/app/lib/types";

export function DeckTable({ decks, showPlayers }: {
    decks: DeckWithRelations[],
    showPlayers?: boolean,
}) {

    return (
        <table className="w-full">
            <thead className="font-bold border-b-2 border-slate-700 text-left">
            <tr>
                <th>Name</th>
                {showPlayers && (
                    <th>Owner</th>
                )}
                <th>
                    <span className="hidden md:inline">Wins</span>
                    <span className="md:hidden">W</span>
                </th>
                <th>
                    <span className="hidden md:inline">Losses</span>
                    <span className="md:hidden">L</span>
                </th>
                <th>
                    <span className="hidden md:inline">Win Rate</span>
                    <span className="md:hidden">W/R</span>
                </th>
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
