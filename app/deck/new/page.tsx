import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import Card from "@/app/components/card";
import {generatePlayerAndDeckSelectOptions} from "@/app/lib/utils";
import { DeckForm } from "@/app/components/forms/deck";

export const metadata: Metadata = {
    title: "New Deck",
};

export default async function Page() {
    const playerAndDeckSelectOptions = await generatePlayerAndDeckSelectOptions();

    return (
        <Header text={`New Deck`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <DeckForm playerOptions={playerAndDeckSelectOptions.playerOptions} />
                </Card>
            </div>
        </Header>
    );
}
