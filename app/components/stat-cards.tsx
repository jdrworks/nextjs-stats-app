import Card from "@/app/components/card";
import React from "react";
import { StatCard } from "@/app/components/stat-card";
import { DeckGameWithGames } from "@/app/lib/types";

export function StatCards({ deck_games }:  { deck_games: DeckGameWithGames[] }) {
    let wins = 0;
    let losses = 0;
    let firstOut = 0;
    let secondPlace = 0;
    let secondPlaceTies = 0;
    let thirdPlace = 0;
    let thirdPlaceTies = 0;
    let threePlayerWins = 0;
    let threePlayerLosses = 0;

    deck_games.forEach((deck_game) => {
        let playerPosition = 0;
        let lowestPosition = 0;
        let secondPosition = false;
        let thirdPosition = false;
        if (deck_game.position === 1) {
            wins++;
        } else {
            losses++;
        }
        const gameCount = deck_game.game?.deck_game.length;
        let secondPlaces = 0;
        let thirdPlaces = 0;
        deck_game.game?.deck_game.map((game_deck_game) => {
            if (game_deck_game.position > lowestPosition) {
                lowestPosition = game_deck_game.position;
            }

            if (game_deck_game.position === 2) {
                secondPlaces++;
            }

            if (game_deck_game.position === 3 && gameCount !== 3) {
                thirdPlaces++;
            }

            if (game_deck_game.player_id === deck_game.player_id) {
                playerPosition = game_deck_game.position;
                if (gameCount === 3) {
                    if (game_deck_game.position === 1) {
                        threePlayerWins++;
                    } else {
                        threePlayerLosses++;
                    }
                } else if (game_deck_game.position === 3) {
                    thirdPosition = true;
                }

                if (game_deck_game.position === 2) {
                    secondPosition = true;
                }
            }
        });

        if (playerPosition === lowestPosition) {
            firstOut++;
        }

        if (secondPosition) {
            if (secondPlaces > 1) {
                secondPlaceTies++;
            } else {
                secondPlace++;
            }
        }

        if (thirdPosition) {
            if (thirdPlaces > 1) {
                thirdPlaceTies++;
            } else {
                thirdPlace++;
            }
        }
    });

    const totalGames = wins + losses;
    const threePlayerTotalGames = threePlayerLosses + threePlayerLosses;

    const winrate = totalGames === 0 ? 'N/A' : Math.round((wins / totalGames) * 100) + '%';
    const firstOutRate = firstOut === 0 ? 'N/A' : Math.round((firstOut / totalGames) * 100) + '%';
    const threePlayerWinrate = threePlayerLosses === 0 ? 'N/A' : Math.round((threePlayerWins / threePlayerTotalGames) * 100) + '%';
    const secondPlaceRate = secondPlace === 0 ? 'N/A' : Math.round((secondPlace / totalGames) * 100) + '%';
    const secondPlaceTiesRate = secondPlaceTies === 0 ? 'N/A' : Math.round((secondPlaceTies / totalGames) * 100) + '%';
    const thirdPlaceRate = thirdPlace === 0 ? 'N/A' : Math.round((thirdPlace / totalGames) * 100) + '%';
    const thirdPlaceTiesRate = thirdPlaceTies === 0 ? 'N/A' : Math.round((thirdPlaceTies / totalGames) * 100) + '%';

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
                <StatCard title="Second Place">
                    {secondPlace} / {secondPlaceRate}
                </StatCard>
                <StatCard title="Second Place Ties">
                    {secondPlaceTies} / {secondPlaceTiesRate}
                </StatCard>
                <StatCard title="Third Place">
                    {thirdPlace} / {thirdPlaceRate}
                </StatCard>
                <StatCard title="Third Place Ties">
                    {thirdPlaceTies} / {thirdPlaceTiesRate}
                </StatCard>
                <StatCard title="3 Player Winrate">
                    {threePlayerWinrate}
                </StatCard>

            </div>
        </Card>
    )
}
