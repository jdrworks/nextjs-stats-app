import Card from "@/app/components/card";
import React from "react";

export function StatCard({ title, children }:  { title: string, children: React.ReactNode }) {

    return (
        <Card>
            <span className="text-md text-slate-500">{ title }</span><br/>
            <strong className="text-xl text-emerald-600">
                { children }
            </strong>
        </Card>
    )
}
