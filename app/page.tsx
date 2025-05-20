import React from "react";
import type {Metadata} from "next";
import Header from "@/app/components/header";
import { fetchGames, fetchPlayers } from "@/app/lib/queries";
import { GameWithRelations, PlayerWithRelations } from "@/app/lib/types";
import { PlayerCard } from "@/app/components/player-card";
import { GameCard } from "@/app/components/game-card";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
export const metadata: Metadata = {
    title: "Dashboard",
};
export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const players: PlayerWithRelations[] = await fetchPlayers();
    const games: GameWithRelations[] = await fetchGames(4);

  return (
      <Header text={`Dashboard`}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {games.map((game: GameWithRelations) => (
                <GameCard key={game.id} game={game} showButton={!!session} />
              ))}
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {players.map((player: PlayerWithRelations) => (
                  <PlayerCard
                      key={player.id}
                      id={player.id}
                      name={player.name}
                      games={player.gameResults}
                  />
              ))}
          </div>
      </Header>
  );
}
