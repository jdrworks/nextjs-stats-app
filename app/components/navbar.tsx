import NavbarLinks from "@/app/components/navbar-links";
import { ChartBarIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
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
                </div>
            </div>
        </nav>
    );
}
