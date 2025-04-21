import { getPlayer } from "@/app/lib/query";
import type {Metadata} from "next";
import {updateHeaderText} from "@/app/layout";

export const metadata: Metadata = {
    title: "Magic Stats",
    description: "GUI for interacting with Magic Stats",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const p = await params;
    const player = await getPlayer(p.id);
    const playerData = await player.data
    updateHeaderText(`${playerData?.name}'s Decks`);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                Name: {playerData?.name}<br/>
                Decks: <ul>
                    {playerData?.deck.map((deck) => (
                        <li key={deck.id}>{deck.name}</li>
                    ))}
                </ul>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                Footer
            </footer>
        </div>
    );
}
