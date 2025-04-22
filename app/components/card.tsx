import React from "react";

export default function Card({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="rounded-md bg-white px-3 py-2 shadow-sm">
            {children}
        </div>
    );
}
