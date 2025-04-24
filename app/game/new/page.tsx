import Header from "@/app/components/header";
import type {Metadata} from "next";
import React from "react";
import Card from "@/app/components/card";
import {GameForm} from "@/app/components/forms/game";
import {generateDropdownConfig} from "@/app/lib/utils";

export const metadata: Metadata = {
    title: "New Game",
};

export default async function Page() {
    const dropdownConfigs = await generateDropdownConfig();

    return (
        <Header text={`New Game`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <GameForm playerConfig={dropdownConfigs.playerConfig} deckConfig={dropdownConfigs.deckConfig} />
                </Card>
            </div>
        </Header>
    );
}
