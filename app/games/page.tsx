import Header, { headerButton } from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import { fetchGames } from "@/app/lib/queries";
import { GameWithRelations } from "@/app/lib/types";
import { GameCard } from "@/app/components/game-card";

export const metadata: Metadata = {
    title: "Games",
};

export default async function Page() {
    const games: GameWithRelations[] = await fetchGames();
    const headerButton: headerButton = {
        href: '/game/new',
        text: 'New Game'
    }

    return (
        <Header text={`Games`} button={headerButton}>
            <div className="w-full grid grid-cols-1 gap-4">
                {games.map((game: GameWithRelations) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </Header>
    );
}
