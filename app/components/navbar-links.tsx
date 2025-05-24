'use client';

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import clsx from 'clsx';

const links: { text: string, href: string, activeSegments: string[] }[] = [
    {
        text: 'Dashboard',
        href: '/',
        activeSegments: ['']
    },
    {
        text: 'Players',
        href: '/players',
        activeSegments: ['players', 'player']
    },
    {
        text: 'Games',
        href: '/games',
        activeSegments: ['games', 'game']
    },
    {
        text: 'Decks',
        href: '/decks',
        activeSegments: ['decks', 'deck']
    },
]

export function NavbarLinks() {
    const activeSegment = useSelectedLayoutSegment() ?? '';
    return (
        <>
            {links.map((link) => {
                const isActive = link.activeSegments.includes(activeSegment);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                            'rounded-md px-3 py-2 text-sm font-medium',
                            {
                                'text-slate-300 hover:bg-slate-700 hover:text-white': !isActive,
                                'bg-slate-700 text-white': isActive,
                            }
                        )}>
                        {link.text}
                    </Link>
                );
            })}
        </>
    );
}

export function MobileLinks() {
    const activeSegment = useSelectedLayoutSegment() ?? '';
    return (
        <>
            {links.map((link) => {
                const isActive = link.activeSegments.includes(activeSegment);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                            'block rounded-md px-3 py-2 text-base font-medium',
                            {
                                'text-slate-300': !isActive,
                                'bg-slate-700 text-white': isActive,
                            }
                        )}>
                        {link.text}
                    </Link>
                );
            })}
        </>
    );
}
