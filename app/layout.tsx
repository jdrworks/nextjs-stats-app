import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import NavBar from "@/app/components/navbar";

export const metadata: Metadata = {
    title: {
        template: '%s | Magic Stats',
        default: 'Magic Stats',
    },
    description: 'An easy interface for updating and viewing game stats written with Next.js.',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`h-full bg-slate-300`}>
            <body className="antialiased h-full">
                <div className="min-h-full">
                    <NavBar/>

                    {children}
                </div>
            </body>
        </html>
    );
}
