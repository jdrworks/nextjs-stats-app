import Header, { headerButton } from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import { fetchDeck } from "@/app/lib/queries";
import { StatCards } from "@/app/components/stat-cards";
import { DeckWithRelations, GameResultWithRelations, GameWithRelations } from "@/app/lib/types";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { GameCard } from "@/app/components/game-card";

export const metadata: Metadata = {
    title: "Deck Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const games: GameWithRelations[] = [];
    const { id } = await params;
    const deck: DeckWithRelations = await fetchDeck(id);
    const headerButton: headerButton = {
        href: `/deck/${id}/edit`,
        text: 'Edit Deck'
    }

    deck.gameResults.map((gameResult: GameResultWithRelations) => {
        games.push(gameResult.game);
    })

    return (
        <Header text={deck?.name ?? ''} button={session ? headerButton : undefined}>
            <div className="w-full grid grid-cols-1 gap-4 mb-4">
                <StatCards gameResults={deck.gameResults} />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.sort((a,b) => new Date(b.datetime).valueOf() - new Date(a.datetime).valueOf()).map((game: GameWithRelations) => (
                    <GameCard key={game.id} game={game} showButton={!!session} deckId={deck.id} />
                ))}
            </div>
        </Header>
    );
}
