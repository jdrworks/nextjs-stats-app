import React from "react";
import Link from "next/link";

export interface headerButton {
    href: string;
    text: string;
}

export default function Header({ children, text, button }: Readonly<{ children: React.ReactNode, text: string, button?: headerButton }>) {
    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between mb-3">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{text}</h1>
                    { button && (
                        <Link
                            href={button.href}
                            className="rounded-sm text-lg font-bold bg-green-700 text-white px-2 py-1 hover:bg-green-900 hover:text-gray-200"
                        >
                            {button.text}
                        </Link>
                    )}
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {children}
            </div>
        </>
    );
}
