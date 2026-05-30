import Card from "@/app/components/card";
import React from "react";
import { StatCard } from "@/app/components/stat-card";
import { GameResultWithRelations, GameResultWithPlayer, PlayerWithRelations } from "@/app/lib/types";
import { fetchPlayer } from "@/app/lib/queries";

export async function StatCards({ gameResults }:  { gameResults: GameResultWithRelations[] }) {
    let wins = 0;
    let losses = 0;
    let firstOut = 0;
    let secondPlace = 0;
    let secondPlaceTies = 0;
    let thirdPlace = 0;
    let thirdPlaceTies = 0;
    let threePlayerWins = 0;
    let threePlayerLosses = 0;
    let fourPlayerWins = 0;
    let fourPlayerLosses = 0;
    let playerId = 0;
    const lostTo: number[] = [];

    gameResults.forEach((gameResult) => {
        playerId = gameResult.playerId;
        let playerPosition = 0;
        let lowestPosition = 0;
        let secondPosition = false;
        let thirdPosition = false;
        if (gameResult.position === 1) {
            wins++;
        } else {
            losses++;
        }

        let secondPlaces = 0;
        let thirdPlaces = 0;
        const playerCount = gameResult.game.gameResults.length;
        gameResult.game.gameResults.map((subGameResult: GameResultWithPlayer) => {
            if (subGameResult.position > lowestPosition) {
                lowestPosition = subGameResult.position;
            }

            if (subGameResult.position === 2) {
                secondPlaces++;
            }

            if (subGameResult.position === 3 && playerCount !== 3) {
                thirdPlaces++;
            }

            if (subGameResult.position === 1 && subGameResult.playerId !== playerId) {
                lostTo.push(subGameResult.playerId);
            }

            if (subGameResult.playerId === gameResult.playerId) {
                playerPosition = subGameResult.position;
                if (playerCount === 4) {
                    if (subGameResult.position === 1) {
                        fourPlayerWins++;
                    } else {
                        fourPlayerLosses++;
                    }
                }
                if (playerCount === 3) {
                    if (subGameResult.position === 1) {
                        threePlayerWins++;
                    } else {
                        threePlayerLosses++;
                    }
                } else if (subGameResult.position === 3) {
                    thirdPosition = true;
                }

                if (subGameResult.position === 2) {
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

    const winnerCount: { [key: number]: number } = {};
    lostTo.forEach(playerId => {
        if (winnerCount[playerId]) {
            winnerCount[playerId]++;
        } else {
            winnerCount[playerId] = 1;
        }
    });
    const sortable = [];
    for (let pId in winnerCount) {
        sortable.push([pId, winnerCount[pId]]);
    }

    let archEnemy: PlayerWithRelations | null = null;

    if (sortable.length > 0) {
        const archEnemyId: number = sortable.sort((a, b) => b[1] - a[1])[0][0];
        archEnemy = await fetchPlayer(archEnemyId);
    }

    const totalGames = wins + losses;
    const threePlayerTotalGames = threePlayerLosses + threePlayerLosses;
    const fourPlayerTotalGames = fourPlayerLosses + fourPlayerLosses;

    const winrate = totalGames === 0 ? 'N/A' : Math.round((wins / totalGames) * 100) + '%';
    const firstOutRate = firstOut === 0 ? 'N/A' : Math.round((firstOut / totalGames) * 100) + '%';
    const threePlayerWinrate = threePlayerLosses === 0 ? 'N/A' : Math.round((threePlayerWins / threePlayerTotalGames) * 100) + '%';
    const fourPlayerWinrate = fourPlayerLosses === 0 ? 'N/A' : Math.round((fourPlayerWins / fourPlayerTotalGames) * 100) + '%';
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
                <StatCard title="4 Player Winrate">
                    {fourPlayerWinrate}
                </StatCard>
                <StatCard title="Arch-Enemy">
                    {archEnemy? archEnemy.name : 'N/A'}
                </StatCard>
            </div>
        </Card>
    )
}
