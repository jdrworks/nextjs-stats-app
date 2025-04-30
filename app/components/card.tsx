import React from "react";

export default function Card({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="rounded-md bg-slate-800 border-slate-700 border px-3 py-2 shadow-sm text-slate-300">
            {children}
        </div>
    );
}
