import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import {getPlayers} from "@/app/lib/query";
import {Player} from "@/app/components/player";

export const metadata: Metadata = {
    title: "Magic Stats",
    description: "GUI for interacting with Magic Stats",
};

export default async function Page() {
    const players = await getPlayers();

    return (
        <Header text={`Players`}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players?.data.map((player) => (
                    <Player key={player.id} id={player.id} name={player.name} games={player.deck_game}></Player>
                ))}
            </div>
        </Header>
    );
}
