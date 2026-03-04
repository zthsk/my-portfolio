"use client";

import {usePathname} from 'next/navigation';
import Link from 'next/link';

function NavLink({title, href}) {
    const pathname = usePathname()

    return (
        <Link href={href}>
            <button
                type="button"
                className={`rounded-full no-underline flex h-9 px-4 mr-0 items-center cursor-pointer font-medium text-sm transition-colors border ${
                    pathname === href
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-transparent text-slate-200 border-transparent hover:border-slate-700 hover:bg-slate-800'
                }`}>
                {title}
            </button>
        </Link>
    );
}

export default NavLink;