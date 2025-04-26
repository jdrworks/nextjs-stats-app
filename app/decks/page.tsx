import Header, { headerButton } from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import { fetchDecks } from "@/app/lib/queries";
import Card from "@/app/components/card";
import { DeckTable } from "@/app/components/deck-table";

export const metadata: Metadata = {
    title: "Decks",
};

export default async function Page() {
    const decks = await fetchDecks();
    const headerButton: headerButton = {
        href: '/deck/new',
        text: 'New Deck'
    }

    return (
        <Header text={`Decks`} button={headerButton}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <DeckTable decks={decks} showPlayers={true} />
                </Card>
            </div>
        </Header>
    );
}
