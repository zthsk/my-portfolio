import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import publications from "../../../data/publications.json";

export default function Publications() {
    return (
        <section className="w-full">
            <header className="mb-8 border-b border-zinc-800 pb-8">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Research record</p>
                <h1 className="font-display text-4xl font-medium text-zinc-50 md:text-5xl">Publications</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
                    Peer-reviewed work and an in-progress manuscript on robust NLP, causal modeling, and controllable generation.
                </p>
            </header>
            <div className="space-y-5">
                {getSortedPublications().map((item) => (
                    <PublicationCard key={item.id} item={item}/>
                ))}
            </div>
        </section>
    );
}

export function SelectedPublications() {
    return (
        <section className="border-b border-zinc-800/80 pb-14 md:pb-20">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Selected research</p>
                    <h2 className="font-display text-3xl font-medium text-zinc-50 md:text-4xl">From causal theory to evaluated NLP systems.</h2>
                </div>
                <Link
                    href="/publications"
                    className="inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                    All publications
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
                {getSortedPublications().map((item) => (
                    <PublicationCard key={item.id} item={item} compact/>
                ))}
            </div>
        </section>
    );
}

function PublicationCard({item, compact = false}) {
    const [beforeName, afterName = ""] = item.citation.split(item.bold_name);

    return (
        <article className="flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-lg shadow-black/15">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span>{item.year}</span>
                <span className={`rounded-md border px-2 py-1 font-semibold ${item.status === "Published" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"}`}>
                    {item.status}
                </span>
            </div>

            <h3 className={`${compact ? "text-base" : "text-lg md:text-xl"} mt-4 leading-7 text-zinc-50`}>
                {beforeName}<strong>{item.bold_name}</strong>{afterName}
            </h3>

            <p className="mt-4 text-sm leading-6 text-zinc-300">{item.summary}</p>
            {!compact && (
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                    <span className="font-semibold text-zinc-300">Contribution:</span> {item.contribution}
                </p>
            )}
            <p className="mt-3 text-sm leading-6 text-zinc-400">
                <span className="font-semibold text-zinc-300">Evidence:</span> {item.result}
            </p>

            {!compact && item.keywords?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                        <span key={keyword} className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-300">
                            {keyword}
                        </span>
                    ))}
                </div>
            )}

            {item.href && (
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                    Read publication
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs"/>
                </a>
            )}
        </article>
    );
}

function getSortedPublications() {
    return [...publications.publications].sort((a, b) => Number(b.year) - Number(a.year));
}
