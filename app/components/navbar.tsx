'use client';

import { MobileLinks, NavbarLinks } from "@/app/components/navbar-links";
import { Bars3Icon, ChartBarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
            setShowMenu(false)
    }, [pathname])

    return (
        <nav className="bg-slate-800 border-b-slate-700 border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex">
                            <ChartBarIcon className="size-8 fill-sky-500"/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-baseline space-x-4">
                                <NavbarLinks/>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            { children }
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-300
                                outline-hidden"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => setShowMenu(!showMenu)}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className={clsx("size-8 fill-slate-300",
                                {'hidden': showMenu}
                            )}/>
                            <XMarkIcon className={clsx("size-8 fill-slate-300",
                                {'hidden': !showMenu}
                            )}/>
                        </button>
                    </div>
                </div>

                <div className={clsx("md:hidden bg-slate-800", {'hidden': !showMenu})} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        <MobileLinks />
                    </div>
                    <div className="border-t border-gray-700 py-3">
                        <div className="flex items-center justify-between">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
);
}
