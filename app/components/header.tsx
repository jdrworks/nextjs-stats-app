import React from "react";
import Link from "next/link";

export interface headerButton {
    href: string;
    text: string;
}

export default function Header({ children, text, button }: Readonly<{ children: React.ReactNode, text: string, button?: headerButton }>) {
    return (
        <>
            <header className="bg-slate-100 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between mb-3">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{text}</h1>
                    { button && (
                        <Link
                            href={button.href}
                            className="rounded-sm text-lg font-bold bg-emerald-700 text-emerald-50 px-2 py-1 hover:bg-emerald-800 hover:text-white"
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
