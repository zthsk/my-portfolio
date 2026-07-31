import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import personalInfo from "../../../data/personalInfo.json";

export default function About() {
    return (
        <section className="grid gap-8 rounded-xl border border-zinc-800 bg-zinc-950/65 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
            <div>
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    About & availability
                </p>
                <h2 className="font-display text-3xl font-medium text-zinc-50 md:text-4xl">
                    Research depth, engineering discipline.
                </h2>
                <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-zinc-300 md:text-base">
                    {personalInfo.self_description_detail.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                >
                    <FontAwesomeIcon icon={faEnvelope}/>
                    Start a conversation
                </a>
                <Link
                    href="/experience"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                    Experience
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                </Link>
            </div>
        </section>
    );
}
