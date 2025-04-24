import Link from "next/link";
import React from "react";

export default function Button({href, children}: Readonly<{href: string, children: React.ReactNode}>) {
    return (
        <Link
            href={href}
            className="rounded-sm bg-emerald-700 text-emerald-50 px-2 py-1 hover:bg-emerald-800 hover:text-white"
        >
            {children}
        </Link>
    );
}
