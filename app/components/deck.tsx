import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import Button from "@/app/components/button";

export const Player: React.FC<{
    name: string;
    id: number;
    games: Array<{id: number, game_id: number, deck_id: number, player_id: number, position: number}>
}> = ({name, id, games}) => {
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
        <div className="rounded-md bg-white px-3 py-2 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <strong>{name}</strong>
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
        </div>
    );
}
