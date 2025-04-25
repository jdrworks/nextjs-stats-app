import React from 'react';
import Button from "@/app/components/button";
import Card from "@/app/components/card";

export function Player({ name, id, games }: { name: string, id: number,
games: Array<{id: number, game_id: number, deck_id: number, player_id: number, position: number}>}) {
    let wins = 0;
    let losses = 0;
    games.forEach((game) => {
        if (game.position === 1) {
            wins++;
        } else {
            losses++;
        }
    });

    const winrate = wins + losses === 0 ? 'N/A' : Math.round((wins / (wins + losses)) * 100) + '%';

    return (
        <Card>
            <div className="flex items-center justify-between mb-3">
                <strong className="text-lg">{name}</strong>
                <Button href={`/player/${id}`}>Details</Button>
            </div>
            <table className="w-full">
                <thead className="font-bold border-b-2 border-gray-200 text-left">
                    <tr>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Win Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{wins}</td>
                        <td>{losses}</td>
                        <td>{winrate}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
}
