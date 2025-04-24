import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import Card from "@/app/components/card";
import {GameForm} from "@/app/components/forms/game";
import {generateDropdownConfig, generateGameFormRows} from "@/app/lib/utils";

export const metadata: Metadata = {
    title: "Edit Game",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const input = await params;
    const dropdownConfigs = await generateDropdownConfig();
    const gameFormRows = await generateGameFormRows(input.id);

    return (
        <Header text={`Edit Game`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <GameForm
                        playerConfig={dropdownConfigs.playerConfig}
                        deckConfig={dropdownConfigs.deckConfig}
                        gameId={input.id}
                        gameFormRows={gameFormRows}
                    />
                </Card>
            </div>
        </Header>
    );
}
