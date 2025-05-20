import React from 'react';
import Button from "@/app/components/button";
import Card from "@/app/components/card";
import Link from "@/app/components/link";
import { DateTime } from "luxon";
import { GameWithRelations } from "@/app/lib/types";
import clsx from "clsx";

export function GameCard({ game, showButton }: { game: GameWithRelations, showButton: boolean }) {
    return (
        <Card key={game.id}>
            <div className="flex items-center justify-between mb-3">
                <strong className="text-xl">{DateTime.fromJSDate(game.datetime).toLocaleString()}</strong>
                {showButton && (
                    <Button href={`/game/${game.id}/edit`}>Edit</Button>
                )}
            </div>
            <table className="w-full">
                <thead className="font-bold border-b-2 border-slate-700 text-left">
                <tr>
                    <th className="w-1/4">Player</th>
                    <th className="w-1/2">Deck</th>
                    <th className="w-1/4">Position</th>
                </tr>
                </thead>
                <tbody>
                {game.gameResults.map((gameResult, index) => (
                    <tr key={index} className={clsx({ 'font-extrabold': gameResult.position === 1 })}>
                        <td>
                            <Link href={`/player/${gameResult.playerId}`}>
                                {gameResult.player.name}
                            </Link>
                        </td>
                        <td>{gameResult.deck.name}</td>
                        <td>{gameResult.position}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    );
}
