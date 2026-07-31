import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faEnvelope, faFileArrowDown} from "@fortawesome/free-solid-svg-icons";
import personalInfo from "../../../data/personalInfo.json";
import SocialMedia from "./SocialMedia";

export default function NameCard() {
    return (
        <section className="grid w-full gap-10 border-b border-zinc-800/80 pb-14 md:grid-cols-[1.45fr_0.55fr] md:items-center md:gap-12 md:pb-20">
            <div className="order-2 md:order-1">
                <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    {personalInfo.name} · AI Research Engineer
                </p>
                <h1 className="max-w-4xl text-balance font-display text-4xl font-medium leading-[1.03] text-zinc-50 sm:text-5xl md:text-6xl">
                    {personalInfo.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                    {personalInfo.availability}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                    {personalInfo.self_description_brief}
                </p>

                <div className="mt-6 flex flex-wrap gap-2" aria-label="Areas of expertise">
                    {personalInfo.research_interests.map((interest) => (
                        <span
                            key={interest}
                            className="rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 font-mono text-xs text-zinc-300"
                        >
                            {interest}
                        </span>
                    ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                        href="#selected-work"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                    >
                        View selected work
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                    </Link>
                    <a
                        href={personalInfo.cv_link}
                        download
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/70 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                        <FontAwesomeIcon icon={faFileArrowDown} className="text-sm"/>
                        Download CV
                    </a>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="text-sm"/>
                        Contact me
                    </a>
                </div>

                <div className="mt-6">
                    <SocialMedia/>
                </div>
            </div>

            <div className="order-1 flex justify-center md:order-2 md:justify-end">
                <div className="relative aspect-[4/5] w-40 sm:w-48 md:w-56">
                    <div className="absolute inset-3 translate-x-3 translate-y-3 rounded-xl border border-cyan-300/40"/>
                    <div className="absolute -inset-2 rounded-xl border border-violet-300/15"/>
                    <Image
                        src="/images/avatar.jpeg"
                        alt={`${personalInfo.name}, AI Research Engineer and PhD Candidate`}
                        width={448}
                        height={560}
                        priority
                        sizes="(max-width: 768px) 192px, 224px"
                        className="relative h-full w-full rounded-xl border border-zinc-700 object-cover shadow-2xl shadow-black/30"
                    />
                </div>
            </div>
        </section>
    );
}
