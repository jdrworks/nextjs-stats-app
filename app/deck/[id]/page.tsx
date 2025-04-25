import Header from "@/app/components/header";
import type { Metadata } from "next";
import React from "react";
import { fetchDeck } from "@/app/lib/queries";
import Card from "@/app/components/card";

export const metadata: Metadata = {
    title: "Deck Details",
};

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const deck = await fetchDeck(id);

    return (
        <Header text={deck?.name ?? ''}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    Owner: {deck?.player?.name ?? ''}
                </Card>
            </div>
        </Header>
    );
}
