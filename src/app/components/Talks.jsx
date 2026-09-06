import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import talks from "../../../data/talks.json";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

export default function Talks() {
    const entries = [...talks.talks].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (entries.length === 0) return null;

    return (
        <section id="talks" aria-labelledby="talks-heading" className="scroll-mt-24">
            <div className="mb-6">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Knowledge sharing
                </p>
                <h2 id="talks-heading" className="font-display text-3xl font-medium text-zinc-50 md:text-4xl">
                    Talks &amp; Workshops
                </h2>
            </div>

            <div className="space-y-5">
                {entries.map((talk) => (
                    <article
                        key={talk.id}
                        aria-labelledby={`talk-${talk.id}`}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-lg shadow-black/15 md:p-6"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                            <div className="min-w-0">
                                <h3 id={`talk-${talk.id}`} className="font-display text-2xl font-medium leading-tight text-zinc-50 md:text-3xl">
                                    {talk.title}
                                </h3>
                                <p className="mt-2 text-sm text-zinc-300">{talk.venue}</p>
                                <p className="mt-1 text-sm text-zinc-400">{talk.location}</p>
                            </div>
                            <div className="shrink-0 text-sm text-zinc-400 md:text-right">
                                <time dateTime={talk.date}>{dateFormatter.format(new Date(talk.date))}</time>
                                <p className="mt-1">{talk.role} · {talk.duration}</p>
                            </div>
                        </div>

                        {talk.description?.length > 0 && (
                            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 marker:text-cyan-300 md:text-base">
                                {talk.description.map((description) => <li key={description}>{description}</li>)}
                            </ul>
                        )}

                        {talk.href && (
                            <a
                                href={talk.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Event details: ${talk.title} (opens in a new tab)`}
                                className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                            >
                                Event details
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" aria-hidden="true"/>
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
