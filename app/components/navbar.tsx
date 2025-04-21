import React from "react";
import NavbarLinks from "@/app/components/navbar-links";

export default function NavBar() {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <img className="size-8"
                                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                 alt="Your Company"/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavbarLinks/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
