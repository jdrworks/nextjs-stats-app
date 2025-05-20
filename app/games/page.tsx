import Header, { headerButton } from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import { fetchGames } from "@/app/lib/queries";
import { GameWithRelations } from "@/app/lib/types";
import { GameCard } from "@/app/components/game-card";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Games",
};

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const games: GameWithRelations[] = await fetchGames();
    const headerButton: headerButton = {
        href: '/game/new',
        text: 'New Game'
    }

    return (
        <Header text={`Games`} button={session ? headerButton : undefined}>
            <div className="w-full grid grid-cols-1 gap-4">
                {games.map((game: GameWithRelations) => (
                    <GameCard key={game.id} game={game} showButton={!!session} />
                ))}
            </div>
        </Header>
    );
}
