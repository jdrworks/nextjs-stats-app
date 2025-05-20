'use client';

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { MobileLinks } from "@/app/components/navbar-links";

export function NavbarMobile() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
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

            <div className={clsx("md:hidden bg-slate-800", {'hidden': !showMenu})} id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <MobileLinks />
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="mt-3 space-y-1 px-2">
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your
                            Profile</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
                        <a href="#"
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign
                            out</a>
                    </div>
                </div>
            </div>
        </>
    )
}
