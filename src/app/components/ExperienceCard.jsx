import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function ExperienceCard({ item }) {
    const cardContent = (
        <>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-2 md:mb-0 md:w-2/3">
                    <div className="font-semibold text-xl mb-1 text-slate-50">{item.title}</div>
                    <div className="text-sm text-slate-300 mb-1">
                        <span className="italic">{item.company}</span>
                    </div>
                    {item.project_name && (
                        <div className="text-sm text-slate-300 mb-1 italic">
                            <span className="font-medium text-slate-200">Project:</span> {item.project_name}
                        </div>
                    )}
                    {item.instructor && (
                        <div className="text-sm text-slate-300 mb-1 italic">
                            <span className="font-medium text-slate-200">Instructor:</span> {item.instructor}
                        </div>
                    )}
                </div>
                <div className="md:w-1/3 text-left md:text-right">
                    <div className="text-xs md:text-sm text-slate-400 mb-1">
                        {item.start_date} - {item.end_date}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 mb-1">
                        {item.location}
                    </div>
                </div>
            </div>
            <div className="mt-2">
                {item.description.length > 0 && (
                    <ul className="list-disc list-inside text-sm md:text-base text-slate-300 space-y-1.5">
                        {item.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                )}
            </div>
            {item.href && (
                <div className="absolute bottom-3 right-3 hidden md:block text-slate-400">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                </div>
            )}
        </>
    );

    return item.href ? (
        <a
            href={item.href}
            className="block relative mb-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-amber-400/80 shadow-lg shadow-black/30 hover:shadow-amber-500/20 transition-all"
        >
            <div className="absolute top-3 right-3 md:hidden text-slate-400">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
            </div>
            {cardContent}
        </a>
    ) : (
        <div className="relative mb-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/30">
            {cardContent}
        </div>
    );
}

export default ExperienceCard;