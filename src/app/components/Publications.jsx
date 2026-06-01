import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

import React from "react";
import publications from '../../../data/publications.json';

export default function Publications() {
    const sortedPublications = publications.publications.sort((a, b) => new Date(b.year) - new Date(a.year));

    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6 text-zinc-50">
                Publications
            </div>
            <p className="text-sm text-zinc-400 mb-4">
                Selected publications and manuscripts related to large language models, robust NLP, and machine learning.
            </p>
            {sortedPublications.map(item => (
                <PublicationCard key={item.id} item={item}/>
            ))}
        </div>
    );
}

function PublicationCard({ item }) {
    const highlightedCitation = item.citation.replace(item.bold_name, `<span class="font-bold">${item.bold_name}</span>`);

    const cardContent = (
        <>
            <div className="flex items-center text-xs md:text-sm text-zinc-500">
                <span className="mr-2">{item.year}</span>
                {item.status && (
                    <span className={`ml-2 rounded-md border px-2 py-1 text-xs font-semibold
                        ${item.status === 'Published' ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' :
                          item.status === 'In Progress' ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200' :
                          'border-sky-400/40 bg-sky-400/10 text-sky-200'}`}>
                        {item.status}
                    </span>
                )}
            </div>
            <div className="text-base md:text-lg mt-2 text-zinc-50" dangerouslySetInnerHTML={{ __html: highlightedCitation }}></div>
            {Array.isArray(item.abstract) && item.abstract.length > 0 && (
                <div className="mt-2 text-sm md:text-base text-zinc-300">
                    {item.abstract.map((paragraph, index) => (
                        <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                </div>
            )}
            {Array.isArray(item.keywords) && item.keywords.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                        <span
                            key={keyword}
                            className="rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs md:text-xs text-zinc-200"
                        >
                            {keyword}
                        </span>
                    ))}
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
            <div className="absolute bottom-3 right-3 text-zinc-500">
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
