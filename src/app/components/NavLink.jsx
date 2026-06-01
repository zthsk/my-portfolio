"use client";

import {usePathname} from 'next/navigation';
import Link from 'next/link';

function NavLink({title, href}) {
    const pathname = usePathname()

    return (
        <Link href={href}>
            <button
                type="button"
                className={`rounded-md no-underline flex h-9 px-3 mr-0 items-center cursor-pointer font-medium text-sm transition-colors border ${
                    pathname === href
                        ? 'bg-cyan-300 text-zinc-950 border-cyan-300 shadow-sm'
                        : 'bg-transparent text-zinc-300 border-transparent hover:border-zinc-700 hover:bg-zinc-900'
                }`}>
                {title}
            </button>
        </Link>
    );
}

export default NavLink;
