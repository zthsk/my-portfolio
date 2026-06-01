import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function ExperienceCard({ item }) {
    const cardContent = (
        <>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-2 md:mb-0 md:w-2/3">
                    <div className="font-semibold text-xl mb-1 text-zinc-50">{item.title}</div>
                    <div className="text-sm text-zinc-300 mb-1">
                        <span className="italic">{item.company}</span>
                    </div>
                    {item.project_name && (
                        <div className="text-sm text-zinc-300 mb-1 italic">
                            <span className="font-medium text-zinc-200">Project:</span> {item.project_name}
                        </div>
                    )}
                    {item.instructor && (
                        <div className="text-sm text-zinc-300 mb-1 italic">
                            <span className="font-medium text-zinc-200">Instructor:</span> {item.instructor}
                        </div>
                    )}
                </div>
                <div className="md:w-1/3 text-left md:text-right">
                    <div className="text-xs md:text-sm text-zinc-500 mb-1">
                        {item.start_date} - {item.end_date}
                    </div>
                    <div className="text-xs md:text-sm text-zinc-500 mb-1">
                        {item.location}
                    </div>
                </div>
            </div>
            <div className="mt-2">
                {item.description.length > 0 && (
                    <ul className="list-disc list-inside text-sm md:text-base text-zinc-300 space-y-1.5">
                        {item.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                )}
            </div>
            {item.href && (
                <div className="absolute bottom-3 right-3 hidden md:block text-zinc-500">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                </div>
            )}
        </>
    );

    return item.href ? (
        <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative mb-6 p-5 rounded-lg border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-950 hover:border-cyan-400/60 shadow-lg shadow-black/20 transition-colors"
        >
            <div className="absolute top-3 right-3 md:hidden text-zinc-500">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
            </div>
            {cardContent}
        </a>
    ) : (
        <div className="relative mb-6 p-5 rounded-lg border border-zinc-800 bg-zinc-950/60 shadow-lg shadow-black/20">
            {cardContent}
        </div>
    );
}

export default ExperienceCard;
