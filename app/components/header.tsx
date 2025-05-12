import React from "react";
import Link from "next/link";

export interface headerButton {
    href: string;
    text: string;
}

export default function Header({ children, text, button }: Readonly<{ children: React.ReactNode, text: string, button?: headerButton }>) {
    return (
        <>
            <header className="my-4 sm:my-6 lg:my-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">{text}</h1>
                    { button && (
                        <Link
                            href={button.href}
                            className="rounded-[3px] text-lg font-bold bg-sky-500 text-sky-50 px-2 py-1 hover:bg-sky-600 hover:text-white"
                        >
                            {button.text}
                        </Link>
                    )}
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </>
    );
}
