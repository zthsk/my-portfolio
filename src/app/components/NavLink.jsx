"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavLink({title, href, onNavigate}) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

    return (
        <Link
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-10 items-center rounded-md border px-3 text-sm font-medium no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                isActive
                    ? "border-cyan-300 bg-cyan-300 text-zinc-950"
                    : "border-transparent text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-50"
            }`}
        >
            {title}
        </Link>
    );
}
