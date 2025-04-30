import Button from "@/app/components/button";
import React from "react";
import Link from "@/app/components/link";
import { DeckWithRelations } from "@/app/lib/types";
import { GameResult } from "@/generated/prisma";



export function DeckRow({ deck, showPlayer }: { deck: DeckWithRelations, showPlayer?: boolean }) {
    let wins = 0;
    let losses = 0;

    deck.gameResults.map((gameResult: GameResult) => {
        if (gameResult.position === 1) {
            wins++;
        } else {
            losses++;
        }
    });

    const winrate = wins + losses === 0 ? 'N/A' : Math.round((wins / (wins + losses)) * 100) + '%';

    return (
        <tr key={deck.id} className="border-t-1 border-slate-700">
            <td className="py-2">{deck.name}</td>
            { showPlayer && (
                <td className="py-2">
                    <Link href={`/player/${deck.player.id}`}>
                        {deck.player.name}
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
