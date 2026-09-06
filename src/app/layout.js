import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import personalInfo from "../../data/personalInfo.json";
import GoatCounterAnalytics from "./components/GoatCounterAnalytics";

config.autoAddCss = false;

const siteUrl = "https://kshitiztiwari.com";

const themeScript = `
    (() => {
        try {
            const savedTheme = localStorage.getItem("portfolio-theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const theme = savedTheme === "light" || savedTheme === "dark"
                ? savedTheme
                : (prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", theme === "dark");
            document.documentElement.style.colorScheme = theme;
        } catch (_) {}
    })();
`;

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${personalInfo.name} | AI Research Engineer`,
        template: `%s | ${personalInfo.name}`,
    },
    description: personalInfo.site_description,
    keywords: ["AI Research Engineer", "Machine Learning Engineer", "LLM Evaluation", "NLP", "RAG", "Robust NLP"],
    authors: [{name: personalInfo.name, url: siteUrl}],
    creator: personalInfo.name,
    openGraph: {
        title: `${personalInfo.name} | AI Research Engineer`,
        description: personalInfo.site_description,
        url: siteUrl,
        siteName: `${personalInfo.name} · AI Research Engineer`,
        images: [{url: "/og.png", width: 1200, height: 630, alt: `${personalInfo.name}, AI Research Engineer`}],
        locale: "en_US",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: `${personalInfo.name} | AI Research Engineer`,
        description: personalInfo.site_description,
        images: ["/og.png"],
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{__html: themeScript}}/>
            </head>
            <body className="font-sans text-zinc-100 antialiased">
                <a
                    href="#main-content"
                    className="fixed left-4 top-3 z-50 -translate-y-20 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition-transform focus:translate-y-0"
                >
                    Skip to content
                </a>
                {children}
                <GoatCounterAnalytics/>
            </body>
        </html>
    );
}
