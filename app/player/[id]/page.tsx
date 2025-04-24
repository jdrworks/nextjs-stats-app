import { getPlayer } from "@/app/lib/queries";
import type {Metadata} from "next";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import React from "react";
import {DeckRow} from "@/app/components/deck-row";

export const metadata: Metadata = {
    title: "Player Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const p = await params;
    const player = await getPlayer(p.id);
    const playerData = await player.data

    let wins = 0;
    let losses = 0;
    let firstOut = 0;
    let threePlayerWins = 0;
    let threePlayerLosses = 0;
    playerData?.deck_game.forEach((deck_game) => {
        let playerPosition = 0;
        let lowestPosition = 0;
        if (deck_game.position === 1) {
            wins++;
        } else {
            losses++;
        }
        const gameCount = deck_game.game?.deck_game.length;
        deck_game.game?.deck_game.map((deck_game) => {
            if (deck_game.position > lowestPosition) {
                lowestPosition = deck_game.position;
            }

            if (deck_game.player_id === playerData.id) {
                playerPosition = deck_game.position;
                if (gameCount === 3) {
                    if (deck_game.position === 1) {
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
        <Header text={`${playerData?.name}'s Details`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <strong className="text-xl">Stats</strong>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <span className="text-md text-gray-500">Total Games</span><br/>
                            <strong className="text-xl">{wins+losses}</strong>
                        </Card>
                        <Card>
                            <span className="text-md text-gray-500">Wins</span><br/>
                            <strong className="text-xl">{wins}</strong>
                        </Card>
                        <Card>
                            <span className="text-md text-gray-500">Losses</span><br/>
                            <strong className="text-xl">{losses}</strong>
                        </Card>
                        <Card>
                            <span className="text-md text-gray-500">Win Rate</span><br/>
                            <strong className="text-xl">{winrate}</strong>
                        </Card>
                        <Card>
                            <span className="text-md text-gray-500">First Out</span><br/>
                            <strong className="text-xl">{firstOut} / {firstOutRate}</strong>
                        </Card>
                        <Card>
                            <span className="text-md text-gray-500">3 Player Winrate</span><br/>
                            <strong className="text-xl">{threePlayerWinrate}</strong>
                        </Card>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <strong className="text-xl">Decks</strong>
                    </div>
                    <table className="w-full">
                        <thead className="font-bold border-b-2 border-gray-200 text-left">
                        <tr>
                            <th>Name</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Win Rate</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {playerData?.deck.map((deck) => (
                                <DeckRow key={deck.id} deck={deck} />
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </Header>
    );
}
