"use client";

import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

const storageKey = "portfolio-theme";

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const savedTheme = localStorage.getItem(storageKey);
        const initialTheme = savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : (mediaQuery.matches ? "dark" : "light");

        applyTheme(initialTheme);
        setTheme(initialTheme);

        const handleSystemChange = (event) => {
            if (localStorage.getItem(storageKey)) return;
            const systemTheme = event.matches ? "dark" : "light";
            applyTheme(systemTheme);
            setTheme(systemTheme);
        };

        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);

    const nextTheme = theme === "dark" ? "light" : "dark";

    const toggleTheme = () => {
        applyTheme(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100 transition-colors hover:border-cyan-300/70 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label={theme ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
            title={theme ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
        >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} aria-hidden="true"/>
        </button>
    );
}
