import Button from "@/app/components/button";
import React from "react";
import { deck_game } from "@/generated/prisma";
import Link from "next/link";
import { DeckWithDeckGame } from "@/app/lib/types";



export function DeckRow({ deck }: { deck: DeckWithDeckGame })  {
    let wins = 0;
    let losses = 0;
    const hasPlayers = Object.hasOwnProperty.call(deck, "player");
    deck.deck_game.forEach((game: deck_game) => {
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
            { hasPlayers && (
                <td className="py-2">
                    <Link
                        href={`/player/${deck.player?.id}`}
                        className="text-emerald-600 hover:underline"
                    >
                        {deck.player?.name}
                    </Link>
                </td>
            )}
            <td className="py-2">{wins}</td>
            <td className="py-2">{losses}</td>
            <td className="py-2">{winrate}</td>
            <td>
                <Button href={`/deck/${deck.id}`}>details</Button>
            </td>
        </tr>
    )
}
