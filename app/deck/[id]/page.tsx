import Header, { headerButton } from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import { fetchDeck } from "@/app/lib/queries";
import { StatCards } from "@/app/components/stat-cards";

export const metadata: Metadata = {
    title: "Deck Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const deck = await fetchDeck(id);
    const headerButton: headerButton = {
        href: `/deck/${id}/edit`,
        text: 'Edit Deck'
    }

    return (
        <Header text={deck?.name ?? ''} button={headerButton}>
            <div className="w-full grid grid-cols-1 gap-4">
                <StatCards deck_games={deck.deck_game} />
            </div>
        </Header>
    );
}
