import Link from "next/link";
import React from "react";

export default function Button({href, children}: Readonly<{href: string, children: React.ReactNode}>) {
    return (
        <Link
            href={href}
            className="rounded-sm bg-purple-700 text-gray-200 px-2 py-1 hover:bg-purple-900 hover:text-white"
        >
            {children}
        </Link>
    );
}
