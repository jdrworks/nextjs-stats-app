import NavbarLinks from "@/app/components/navbar-links";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
    return (
        <nav className="bg-slate-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex">
                            <CodeBracketIcon className="size-6 stroke-emerald-500 fill-emerald-500" />
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
