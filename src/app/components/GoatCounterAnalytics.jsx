"use client";

import Script from "next/script";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {GOATCOUNTER_ENDPOINT, GOATCOUNTER_SCRIPT_URL, getPageViewUrl, shouldLoadAnalytics} from "@/lib/analytics.mjs";

const maxPendingViews = 20;

export default function GoatCounterAnalytics() {
    const pathname = usePathname();
    const [enabled, setEnabled] = useState(false);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const lastPath = useRef(null);
    const pendingViews = useRef([]);

    useEffect(() => {
        if (!shouldLoadAnalytics({
            origin: window.location.origin,
            production: process.env.NODE_ENV === "production",
            doNotTrack: navigator.doNotTrack || window.doNotTrack,
            globalPrivacyControl: navigator.globalPrivacyControl,
        })) return;

        const enableWhenVisible = () => {
            if (document.visibilityState !== "hidden") setEnabled(true);
        };
        enableWhenVisible();
        document.addEventListener("visibilitychange", enableWhenVisible);
        return () => document.removeEventListener("visibilitychange", enableWhenVisible);
    }, []);

    useEffect(() => {
        if (!enabled || failed || !pathname) return;

        if (lastPath.current !== pathname) {
            pendingViews.current.push({
                path: pathname,
                title: document.title,
                referrer: lastPath.current ? window.location.origin : document.referrer,
            });
            lastPath.current = pathname;
            if (pendingViews.current.length > maxPendingViews) pendingViews.current.shift();
        }

        if (!ready) return;

        for (const view of pendingViews.current.splice(0)) {
            try {
                const url = getPageViewUrl(window.goatcounter, view);
                if (!url) continue;

                // Unlike count(), this lets us redact query data and omit cookies.
                // Never retry a blocked request or let analytics interrupt navigation.
                void fetch(url, {
                    method: "POST",
                    mode: "no-cors",
                    credentials: "omit",
                    referrerPolicy: "no-referrer",
                    keepalive: true,
                }).catch(() => {});
            } catch {
                // Disabled storage, a blocked script, or provider errors must be harmless.
            }
        }
    }, [enabled, failed, pathname, ready]);

    if (!enabled || failed) return null;

    return (
        <Script
            id="goatcounter-analytics"
            src={GOATCOUNTER_SCRIPT_URL}
            data-goatcounter={GOATCOUNTER_ENDPOINT}
            data-goatcounter-settings={JSON.stringify({no_onload: true, no_events: true})}
            strategy="afterInteractive"
            onReady={() => setReady(true)}
            onError={() => {
                pendingViews.current = [];
                setFailed(true);
            }}
        />
    );
}
