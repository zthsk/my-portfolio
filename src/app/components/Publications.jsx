import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

import React from "react";
import publications from '../../../data/publications.json';

export default function Publications() {
    const sortedPublications = publications.publications.sort((a, b) => new Date(b.year) - new Date(a.year));

    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6">
                Publications
            </div>
            <p className="text-sm text-slate-400 mb-4">
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
            <div className="flex items-center text-xs md:text-sm text-slate-400">
                <span className="mr-2">{item.year}</span>
                {item.status && (
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'Published' ? 'bg-emerald-100 text-emerald-900' :
                          item.status === 'In Progress' ? 'bg-amber-100 text-amber-900' :
                          'bg-sky-100 text-sky-900'}`}>
                        {item.status}
                    </span>
                )}
            </div>
            <div className="text-base md:text-lg mt-2 text-slate-50" dangerouslySetInnerHTML={{ __html: highlightedCitation }}></div>
            {Array.isArray(item.abstract) && item.abstract.length > 0 && (
                <div className="mt-2 text-sm md:text-base text-slate-300">
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
                            className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs md:text-xs text-slate-100"
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
            className="block relative mb-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-amber-400/80 shadow-lg shadow-black/30 hover:shadow-amber-500/20 transition-all"
        >
            <div className="absolute bottom-3 right-3 text-slate-400">
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