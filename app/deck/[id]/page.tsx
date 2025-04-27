import Header, { headerButton } from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import { fetchDeck } from "@/app/lib/queries";
import { StatCards } from "@/app/components/stat-cards";
import { DeckWithRelations } from "@/app/lib/types";

export const metadata: Metadata = {
    title: "Deck Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const deck: DeckWithRelations = await fetchDeck(id);
    const headerButton: headerButton = {
        href: `/deck/${id}/edit`,
        text: 'Edit Deck'
    }

    return (
        <Header text={deck?.name ?? ''} button={headerButton}>
            <div className="w-full grid grid-cols-1 gap-4">
                <StatCards gameResults={deck.gameResults} />
            </div>
        </Header>
    );
}
