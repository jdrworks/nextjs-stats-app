import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import NavBar from "@/app/components/navbar";
import { NavbarAuth } from "@/app/components/navbar-auth";

export const metadata: Metadata = {
    title: {
        template: '%s | Magic Stats',
        default: 'Magic Stats',
    },
    description: 'An easy interface for updating and viewing game stats written with Next.js.',
};

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`h-full bg-slate-900`}>
            <body className="antialiased h-full">
                <div className="min-h-full pb-4">
                    <NavBar>
                        <NavbarAuth />
                    </NavBar>

                    {children}
                </div>
            </body>
        </html>
    );
}
