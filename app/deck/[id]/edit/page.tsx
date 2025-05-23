import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import Card from "@/app/components/card";
import { generatePlayerAndDeckSelectOptions } from "@/app/lib/utils";
import { DeckForm } from "@/app/components/forms/deck";
import { fetchDeck } from "@/app/lib/queries";

export const metadata: Metadata = {
    title: "Edit Deck",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const playerAndDeckSelectOptions = await generatePlayerAndDeckSelectOptions();
    const deck = await fetchDeck(id);

    return (
        <Header text={`Edit Deck`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <DeckForm playerOptions={playerAndDeckSelectOptions.playerOptions} deck={deck} />
                </Card>
            </div>
        </Header>
    );
}
