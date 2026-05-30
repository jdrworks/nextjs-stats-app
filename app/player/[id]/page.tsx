import { fetchPlayer } from "@/app/lib/queries";
import type { Metadata } from "next";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import React from "react";
import { DeckTable } from "@/app/components/deck-table";
import { GameResultWithRelations, GameWithRelations, PlayerWithRelations } from "@/app/lib/types";
import { StatCards } from "@/app/components/stat-cards";
import { GameCard } from "@/app/components/game-card";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Player Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const { id } = await params;
    const player: PlayerWithRelations = await fetchPlayer(id);
    const games: GameWithRelations[] = [];

    player.gameResults.map((gameResult: GameResultWithRelations) => {
        games.push(gameResult.game);
    })

    return (
        <Header text={`${player.name}'s Details`}>
            <div className="w-full grid grid-cols-1 gap-4 mb-4">
                <StatCards gameResults={player.gameResults} />
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {games.sort((a,b) => new Date(b.datetime).valueOf() - new Date(a.datetime).valueOf()).map((game: GameWithRelations) => (
                        <GameCard key={game.id} game={game} showButton={!!session} playerId={player.id} />
                    ))}
                </div>
                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <strong className="text-xl">Decks</strong>
                    </div>
                    <DeckTable decks={player.decks} />
                </Card>
            </div>
        </Header>
    );
}
