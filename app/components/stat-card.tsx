import Card from "@/app/components/card";
import React from "react";

export function StatCard({ title, children }:  { title: string, children: React.ReactNode }) {

    return (
        <Card>
            <span className="text-md text-slate-400">{ title }</span><br/>
            <strong className="text-xl text-sky-500">
                { children }
            </strong>
        </Card>
    )
}
