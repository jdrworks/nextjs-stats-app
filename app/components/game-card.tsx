import React from 'react';
import Button from "@/app/components/button";
import Card from "@/app/components/card";
import Link from "next/link";
import { DateTime } from "luxon";
import { GameWithRelations } from "@/app/lib/types";

export function GameCard({ game }: { game: GameWithRelations }) {
    return (
        <Card key={game.id}>
            <div className="flex items-center justify-between mb-3">
                <strong className="text-xl">{DateTime.fromJSDate(game.datetime).toLocaleString()}</strong>
                <span className="text-white">{game.id}</span>
                <Button href={`/game/${game.id}/edit`}>Edit</Button>
            </div>
            <table className="w-full">
                <thead className="font-bold border-b-2 border-gray-200 text-left">
                <tr>
                    <th className="w-1/4">Player</th>
                    <th className="w-1/2">Deck</th>
                    <th className="w-1/4">Position</th>
                </tr>
                </thead>
                <tbody>
                {game.gameResults.map((gameResult, index) => (
                    <tr key={index}>
                        <td>
                            <Link href={`/player/${gameResult.playerId}`}>
                                {gameResult.player.name}
                            </Link> {gameResult.position === 1 ? '(Winner)' : ''}
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
