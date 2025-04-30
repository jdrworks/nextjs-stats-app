import Link from "next/link";
import React from "react";

export default function Button({href, children}: Readonly<{href: string, children: React.ReactNode}>) {
    return (
        <Link
            href={href}
            className="rounded-sm bg-sky-500 text-sky-50 px-2 py-1 hover:bg-sky-600 hover:text-white"
        >
            {children}
        </Link>
    );
}
