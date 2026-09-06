export const GOATCOUNTER_SCRIPT_URL = "https://gc.zgo.at/count.js";
export const GOATCOUNTER_ENDPOINT = "https://kshtz.goatcounter.com/count";

const productionOrigins = ["https://kshitiztiwari.com", "https://www.kshitiztiwari.com"];

export function shouldLoadAnalytics({origin, production, doNotTrack, globalPrivacyControl}) {
    return production
        && productionOrigins.includes(origin)
        && doNotTrack !== "1"
        && doNotTrack !== "yes"
        && globalPrivacyControl !== true;
}

export function getReferrerOrigin(referrer) {
    try {
        const url = new URL(referrer);
        return ["https:", "http:"].includes(url.protocol) ? url.origin : "";
    } catch {
        return "";
    }
}

export function getPageViewUrl(goatcounter, {path, title, referrer}) {
    if (typeof goatcounter?.filter !== "function" || typeof goatcounter?.url !== "function") return null;
    if (goatcounter.filter()) return null;

    const safePath = path.split(/[?#]/, 1)[0];
    if (!safePath.startsWith("/") || safePath.startsWith("//")) return null;

    const safeReferrer = getReferrerOrigin(referrer);
    const rawUrl = goatcounter.url({path: safePath, title, referrer: safeReferrer});
    if (!rawUrl) return null;

    const url = new URL(rawUrl);
    const endpoint = new URL(GOATCOUNTER_ENDPOINT);
    if (url.origin !== endpoint.origin || url.pathname !== endpoint.pathname || url.username || url.password) return null;

    // count.js adds location.search as `q` even when an explicit path is supplied.
    // Keep only the standard page-view fields; never send query strings or fragments.
    const allowedFields = new Set(["p", "t", "r", "e", "s", "b", "rnd"]);
    for (const key of [...url.searchParams.keys()]) {
        if (!allowedFields.has(key)) url.searchParams.delete(key);
    }
    url.searchParams.set("p", safePath);
    url.searchParams.set("r", safeReferrer);
    url.hash = "";

    return url.href;
}
