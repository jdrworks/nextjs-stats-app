import Card from "@/app/components/card";
import React from "react";
import { StatCard } from "@/app/components/stat-card";
import { DeckGameWithGames } from "@/app/lib/types";

export function StatCards({ deck_games }:  { deck_games: DeckGameWithGames[] }) {
    let wins = 0;
    let losses = 0;
    let firstOut = 0;
    let threePlayerWins = 0;
    let threePlayerLosses = 0;

    deck_games.forEach((deck_game) => {
        let playerPosition = 0;
        let lowestPosition = 0;
        if (deck_game.position === 1) {
            wins++;
        } else {
            losses++;
        }
        const gameCount = deck_game.game?.deck_game.length;
        deck_game.game?.deck_game.map((gam_deck_game) => {
            if (gam_deck_game.position > lowestPosition) {
                lowestPosition = gam_deck_game.position;
            }

            if (gam_deck_game.player_id === deck_game.player_id) {
                playerPosition = gam_deck_game.position;
                if (gameCount === 3) {
                    if (gam_deck_game.position === 1) {
                        threePlayerWins++;
                    } else {
                        threePlayerLosses++;
                    }
                }
            }
        });

        if (playerPosition === lowestPosition) {
            firstOut++;
        }
    });

    const totalGames = wins + losses;
    const threePlayerTotalGames = threePlayerLosses + threePlayerLosses;

    const winrate = totalGames === 0 ? 'N/A' : Math.round((wins / totalGames) * 100) + '%';
    const firstOutRate = firstOut === 0 ? 'N/A' : Math.round((firstOut / totalGames) * 100) + '%';
    const threePlayerWinrate = threePlayerLosses === 0 ? 'N/A' : Math.round((threePlayerWins / threePlayerTotalGames) * 100) + '%';

    return (
        <Card>
            <div className="flex items-center justify-between mb-3">
                <strong className="text-xl">Stats</strong>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Games">
                    {wins+losses}
                </StatCard>
                <StatCard title="Wins">
                    {wins}
                </StatCard>
                <StatCard title="Losses">
                    {losses}
                </StatCard>
                <StatCard title="Win Rate">
                    {winrate}
                </StatCard>
                <StatCard title="First Out">
                    {firstOut} / {firstOutRate}
                </StatCard>
                <StatCard title="3 Player Winrate">
                    {threePlayerWinrate}
                </StatCard>
            </div>
        </Card>
    )
}
