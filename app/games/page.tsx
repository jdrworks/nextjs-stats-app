import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import { fetchGames } from "@/app/lib/queries";
import { DateTime } from "luxon";
import Card from "@/app/components/card";
import Link from "next/link";
import { headerButton } from "@/app/components/header";
import Button from "@/app/components/button";

export const metadata: Metadata = {
    title: "Games",
};

export default async function Page() {
    const games = await fetchGames();
    const headerButton: headerButton = {
        href: '/game/new',
        text: 'New Game'
    }

    return (
        <Header text={`Games`} button={headerButton}>
            <div className="w-full grid grid-cols-1 gap-4">
                {games.map((game) => (
                    <Card key={game.id}>
                        <div className="flex items-center justify-between mb-3">
                            <strong className="text-xl">{DateTime.fromSeconds(game.datetime).toLocaleString()}</strong>
                            <span className="text-white">{game.id}</span>
                            <Button href={`/game/${game.id}`}>Edit</Button>
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
                            {game.deck_game.map((deck_game) => (
                                <tr key={deck_game.id}>
                                    <td>
                                        <Link
                                            href={`/player/${deck_game.player?.id}`}
                                            className="text-purple-600 hover:underline"
                                        >
                                            {deck_game.player?.name}
                                        </Link> {deck_game.position === 1 ? '(Winner)' : ''}
                                    </td>
                                    <td>{deck_game.deck?.name}</td>
                                    <td>{deck_game.position}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Card>
                ))}
            </div>
        </Header>
    );
}
