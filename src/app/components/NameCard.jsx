"use client";

import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFile, faSchool} from "@fortawesome/free-solid-svg-icons";
import personalInfo from "../../../data/personalInfo.json";
import SocialMedia from "@/app/components/SocialMedia";

function NameCard() {
    return (
        <section className="grid w-full gap-8 border-b border-zinc-800/80 pb-12 md:min-h-[520px] md:grid-cols-[1.35fr_0.65fr] md:items-center md:gap-12">
            <div className="order-2 md:order-1">
                <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    AI Research Engineer / PhD Candidate
                </p>
                <h1 className="max-w-3xl font-display text-4xl font-medium leading-[0.98] tracking-normal text-zinc-50 sm:text-5xl md:text-7xl">
                    {personalInfo.name}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
                    {personalInfo.self_description_brief}
                </p>

                <div className="mt-6 flex max-w-3xl flex-wrap gap-2">
                    {personalInfo.research_interests.map((interest) => (
                        <span
                            key={interest}
                            className="rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 font-mono text-xs text-zinc-300 md:text-sm"
                        >
                            {interest}
                        </span>
                    ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap">
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 py-2 font-semibold text-zinc-950 transition-colors hover:bg-cyan-200"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="text-sm"/>
                        Email me
                    </a>
                    <a
                        href={personalInfo.cv_link}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/70 px-4 py-2 font-medium text-zinc-100 transition-colors hover:border-cyan-300 hover:text-cyan-200"
                    >
                        <FontAwesomeIcon icon={faFile} className="text-sm"/>
                        View CV
                    </a>
                    <a
                        href={personalInfo.work_place_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-800 px-4 py-2 font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
                    >
                        <FontAwesomeIcon icon={faSchool} className="text-sm"/>
                        {personalInfo.work_place}
                    </a>
                </div>

                <div className="mt-6">
                    <SocialMedia/>
                </div>
            </div>

            <div className="order-1 flex justify-center md:order-2 md:justify-end">
                <div className="relative aspect-square w-44 md:w-64">
                    <div className="absolute inset-3 rounded-lg border border-cyan-300/40"/>
                    <div className="absolute -inset-2 rounded-lg border border-violet-300/15"/>
                    <Image
                        src="/images/avatar.jpeg"
                        alt={`${personalInfo.name} profile picture`}
                        width={260}
                        height={260}
                        priority
                        className="relative h-full w-full rounded-lg border border-zinc-700 object-cover shadow-xl shadow-black/30"
                    />
                </div>
            </div>
        </section>
    );
}

export default NameCard;
