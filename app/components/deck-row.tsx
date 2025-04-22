import Button from "@/app/components/button";
import React from "react";
import { deck } from "@/generated/prisma";

export const DeckRow: React.FC<{
    deck: any;
}> = ({deck}) => {
    let wins = 0;
    let losses = 0;
    deck.deck_game.forEach((game) => {
        if (game.position === 1) {
            wins++;
        } else {
            losses++;
        }
    });

    const winrate = wins + losses === 0 ? 'N/A' : Math.round((wins / (wins + losses)) * 100) + '%';

    return (
        <tr key={deck.id} className="border-t-1 border-gray-200">
            <td className="py-2">{deck.name}</td>
            <td className="py-2">{wins}</td>
            <td className="py-2">{losses}</td>
            <td className="py-2">{winrate}</td>
            <td>
                <Button href={`/deck/${deck.id}`}>details</Button>
            </td>
        </tr>
    )
}
