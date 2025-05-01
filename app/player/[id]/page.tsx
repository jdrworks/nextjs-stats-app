import { fetchPlayer } from "@/app/lib/queries";
import type { Metadata } from "next";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import React from "react";
import { DeckTable } from "@/app/components/deck-table";
import { PlayerWithRelations } from "@/app/lib/types";
import { StatCards } from "@/app/components/stat-cards";

export const metadata: Metadata = {
    title: "Player Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const player: PlayerWithRelations = await fetchPlayer(id);

    return (
        <Header text={`${player.name}'s Details`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <StatCards gameResults={player.gameResults} />
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
