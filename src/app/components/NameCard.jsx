"use client";
import Image from "next/image";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faFile, faSchool} from '@fortawesome/free-solid-svg-icons';
import personalInfo from '../../../data/personalInfo.json';
import SocialMedia from "@/app/components/SocialMedia";

function NameCard() {
    return (
        <div className="flex flex-col items-center w-full p-5 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-amber-500/10 mb-10">
            <div className="flex flex-col md:flex-row items-center w-full justify-between gap-6">
                <div className="flex-shrink-0">
                    <Image
                        src="/images/avatar.jpeg"
                        alt="Profile Picture"
                        width={240}
                        height={240}
                        className="rounded-2xl aspect-square object-cover md:ml-3 ring-2 ring-amber-400/60 ring-offset-2 ring-offset-slate-950"
                    />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-right w-full">
                    <div className="text-3xl md:text-5xl font-semibold tracking-tight">
                        {personalInfo.name}
                    </div>
                    <div className="mt-2 text-base md:text-lg text-slate-300">
                        {personalInfo.self_description_brief}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-end">
                        {personalInfo.research_interests.map((interest) => (
                            <span
                                key={interest}
                                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs md:text-sm text-slate-100"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                    <div
                        className="flex flex-col md:flex-row md:flex-wrap items-center md:items-center mt-4 justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-3 text-sm">
                        <div className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faFile} className="text-base mr-2 text-amber-300"/>
                            <a href={personalInfo.cv_link} className="text-amber-300 hover:text-amber-200 underline-offset-4 hover:underline">
                                View CV
                            </a>
                        </div>
                        <div className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faSchool} className="text-base mr-2 text-sky-300"/>
                            <a href={personalInfo.work_place_url} className="text-sky-300 hover:text-sky-200 underline-offset-4 hover:underline">
                                {personalInfo.work_place}
                            </a>
                        </div>
                        <div className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faEnvelope} className="text-base mr-2 text-emerald-300"/>
                            <a href={`mailto:${personalInfo.email}`} className="text-emerald-300 hover:text-emerald-200 underline-offset-4 hover:underline">
                                {personalInfo.email}
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center md:justify-end">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex items-center rounded-full bg-amber-400 text-slate-950 px-4 py-2 text-sm font-medium shadow-sm hover:bg-amber-300 transition-colors"
                        >
                            Let&apos;s talk
                        </a>
                    </div>
                    <div
                        className="flex flex-col md:flex-row items-center md:items-center mt-5 justify-center md:justify-end">
                        <SocialMedia/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NameCard;