import type { Metadata } from "next";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import React from "react";
import { PlayerForm } from "@/app/components/forms/player";

export const metadata: Metadata = {
    title: "Add New Player",
};

export default async function Page() {

    return (
        <Header text={`New Player`}>
            <div className="w-full grid grid-cols-1 gap-4">
                <Card>
                    <PlayerForm />
                </Card>
            </div>
        </Header>
    );
}
