import React from "react";
import type {Metadata} from "next";
import Header from "@/app/components/header";
import { fetchGames, fetchPlayers } from "@/app/lib/queries";
import { GameWithRelations, PlayerWithRelations } from "@/app/lib/types";
import { PlayerCard } from "@/app/components/player-card";
import { GameCard } from "@/app/components/game-card";
export const metadata: Metadata = {
    title: "Dashboard",
};
export default async function Home() {
    const players: PlayerWithRelations[] = await fetchPlayers();
    const games: GameWithRelations[] = await fetchGames(3);

  return (
      <Header text={`Dashboard`}>
          <div className="w-full grid grid-cols-3 gap-4 mb-4">
              {games.map((game: GameWithRelations) => (
                <GameCard key={game.id} game={game} />
              ))}
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
