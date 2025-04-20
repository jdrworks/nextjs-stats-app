import { getPlayer } from "@/app/lib/query";

export default async function Page({ params }: { params: { id: number }}) {
    const p = await params;
    const player = await getPlayer(p.id);
    const playerData = player.data
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
