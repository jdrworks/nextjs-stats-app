import Header from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import Card from "@/app/components/card";
import { GameForm } from "@/app/components/forms/game";
import { generatePlayerAndDeckSelectOptions, generateGameFormRows } from "@/app/lib/utils";

export const metadata: Metadata = {
    title: "Edit Game",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const playerAndDeckSelectOptions = await generatePlayerAndDeckSelectOptions();
    const gameFormRows = await generateGameFormRows(id);

    return (
        <Header text={`Edit Game`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <GameForm
                        playerOptions={playerAndDeckSelectOptions.playerOptions}
                        deckOptions={playerAndDeckSelectOptions.deckOptions}
                        gameId={id}
                        gameFormRows={gameFormRows}
                    />
                </Card>
            </div>
        </Header>
    );
}
