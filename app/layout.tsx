import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import NavBar from "@/app/components/navbar";
import Header from "@/app/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magic Stats",
  description: "GUI for interacting with Magic Stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full bg-gray-100`}>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
        <div className="min-h-full">
            <NavBar/>

            {children}
        </div>
    </body>
    </html>
);
}
