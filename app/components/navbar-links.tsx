'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from 'clsx';

const links = [
    {
        text: 'Dashboard',
        href: '/'
    },
    {
        text: 'Players',
        href: '/players'
    },
    {
        text: 'Games',
        href: '/games'
    },
]

export default function NavbarLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                            'rounded-md px-3 py-2 text-sm font-medium',
                            {
                                'text-gray-300 hover:bg-slate-600 hover:text-white': !isActive,
                                'bg-slate-800 text-white': isActive,
                            }
                        )}>
                        {link.text}
                    </Link>
                );
            })}
        </>
    );
}
