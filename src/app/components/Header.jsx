"use client";

import Link from "next/link";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import personalInfo from "../../../data/personalInfo.json";

const navigation = [
    {title: "Work", href: "/projects"},
    {title: "Experience", href: "/experience"},
    {title: "Publications", href: "/publications"},
    {title: "Research", href: "/research"},
    {title: "Writing", href: "/blog"},
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky inset-x-0 top-0 z-20 w-full border-b border-zinc-800/80 bg-zinc-950/88 backdrop-blur-md">
            <div className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between px-5">
                <Link
                    href="/"
                    className="group inline-flex min-w-0 flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="truncate font-display text-lg font-medium text-zinc-50 transition-colors group-hover:text-cyan-100">
                        {personalInfo.name}
                    </span>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 sm:block">
                        AI Research Engineer
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
                        {navigation.map((item) => (
                            <NavLink key={item.href} {...item}/>
                        ))}
                    </nav>

                    <ThemeToggle/>

                    <button
                        type="button"
                        onClick={() => setIsOpen((open) => !open)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100 transition-colors hover:border-cyan-300/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-lg"/>
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                    className="border-t border-zinc-800 bg-zinc-950 px-5 pb-5 pt-3 md:hidden"
                >
                    <div className="mx-auto flex w-full max-w-5xl flex-col gap-1">
                        {navigation.map((item) => (
                            <NavLink key={item.href} {...item} onNavigate={() => setIsOpen(false)}/>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
