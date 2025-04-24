import React from "react";

export default function Card({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="rounded-md bg-slate-100 px-3 py-2 shadow-sm">
            {children}
        </div>
    );
}
