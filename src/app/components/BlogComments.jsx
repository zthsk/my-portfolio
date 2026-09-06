"use client";

import Giscus from "@giscus/react";
import {useEffect, useRef, useState} from "react";
import commentsConfig from "../../../data/comments.json";

const giscusOrigin = "https://giscus.app";

export default function BlogComments({slug}) {
    const sectionRef = useRef(null);
    const [theme, setTheme] = useState(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const syncTheme = () => {
            setTheme(root.classList.contains("dark") ? "dark" : "light");
        };

        syncTheme();

        const observer = new MutationObserver(syncTheme);
        observer.observe(root, {attributes: true, attributeFilter: ["class"]});

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!("IntersectionObserver" in window)) {
            setShouldLoad(true);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setShouldLoad(true);
                observer.disconnect();
            }
        }, {rootMargin: "400px"});

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== giscusOrigin) return;

            const iframe = sectionRef.current
                ?.querySelector("giscus-widget")
                ?.shadowRoot?.querySelector("iframe");

            if (!iframe || event.source !== iframe.contentWindow) return;

            const error = event.data?.giscus?.error;

            // Empty threads are normal; Giscus handles expired sign-ins itself.
            if (
                typeof error !== "string" ||
                /Discussion not found|Bad credentials|Invalid state value|State has expired/i.test(error)
            ) {
                return;
            }

            setUnavailable(true);
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="comments"
            aria-labelledby="comments-heading"
            className="mx-auto mt-12 w-full max-w-3xl scroll-mt-24 border-t border-zinc-800 pt-8"
        >
            <h2
                id="comments-heading"
                className="font-display text-2xl font-medium tracking-normal text-zinc-50 md:text-3xl"
            >
                Comments
            </h2>
            <p className="mb-6 mt-3 text-sm leading-6 text-zinc-400">
                Share a question, correction, or idea. Sign in with GitHub to join the discussion.
                {" "}Comments are public.
            </p>

            {unavailable ? (
                <p role="status" className="text-sm leading-6 text-zinc-400">
                    Comments couldn’t load right now. You can visit the discussions on GitHub below.
                </p>
            ) : shouldLoad && theme ? (
                <Giscus
                    id="blog-comments"
                    host={giscusOrigin}
                    {...commentsConfig}
                    mapping="specific"
                    term={slug}
                    strict="1"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={theme}
                    lang="en"
                    loading="lazy"
                />
            ) : null}

            <a
                href={`https://github.com/${commentsConfig.repo}/discussions`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-sm text-sm font-medium text-cyan-200 underline decoration-cyan-400/40 underline-offset-4 transition-colors hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
                View discussions on GitHub
            </a>
        </section>
    );
}
