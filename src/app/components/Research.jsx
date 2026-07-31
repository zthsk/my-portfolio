import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import research from "../../../data/research.json";

export default function Research() {
    return (
        <section className="w-full">
            <header className="mb-8 border-b border-zinc-800 pb-8">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Research directions</p>
                <h1 className="font-display text-4xl font-medium text-zinc-50 md:text-5xl">Research</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
                    Current questions and completed work in controllable generation, causal NLP, and adversarial robustness—summarized through contribution and evidence rather than full abstracts.
                </p>
            </header>
            <div className="space-y-5">
                {research.research.map((item) => <ResearchCard key={item.id} item={item}/>) }
            </div>
        </section>
    );
}

function ResearchCard({item}) {
    const links = Object.entries(item.href || {}).filter(([, value]) => typeof value === "string" && value.trim());
    const isPublished = item.status.toLowerCase().includes("published");

    return (
        <article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-lg shadow-black/15 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                    <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${isPublished ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"}`}>
                        {item.status}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-medium leading-tight text-zinc-50 md:text-3xl">
                        {item.research_name}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        {item.company.join(", ")} · Advisor: {item.instructor.join(", ")}
                        {item.collaborators.length > 0 ? ` · Collaborators: ${item.collaborators.join(", ")}` : ""}
                    </p>
                </div>
                {links.length > 0 && (
                    <div className="flex shrink-0 flex-wrap gap-2">
                        {links.map(([label, value]) => (
                            <a
                                key={label}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                            >
                                <FontAwesomeIcon icon={label.toLowerCase() === "github" ? faGithub : faExternalLinkAlt}/>
                                {label}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <ResearchDetail label="Question" text={item.summary}/>
                <ResearchDetail label="Contribution" text={item.contribution}/>
                <ResearchDetail label="Evidence" text={item.result}/>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-300">
                        {keyword}
                    </span>
                ))}
            </div>
        </article>
    );
}

function ResearchDetail({label, text}) {
    return (
        <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/35 p-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300">{label}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
        </div>
    );
}
