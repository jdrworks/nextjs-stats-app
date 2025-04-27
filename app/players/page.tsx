import Header from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import { fetchPlayers } from "@/app/lib/queries";
import { PlayerCard } from "@/app/components/player-card";
import { PlayerWithRelations } from "@/app/lib/types";

export const metadata: Metadata = {
    title: "Players",
};

export default async function Page() {
    const players: PlayerWithRelations[] = await fetchPlayers();

    return (
        <Header text={`Players`}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player: PlayerWithRelations) => (
                    <PlayerCard
                        key={player.id}
                        id={player.id}
                        name={player.name}
                        games={player.gameResults}
                    />
                ))}
            </div>
        </Header>
    );
}
