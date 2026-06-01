"use client";
import React, {useMemo, useState} from "react";
import research from '../../../data/research.json';
import CustomLink from "@/app/components/CustomLink";

export default function Research() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = useMemo(() => {
        const tags = new Set();
        research.research.forEach(r => {
            if (Array.isArray(r.keywords)) {
                r.keywords.forEach(k => tags.add(k));
            }
        });
        return ['All', ...Array.from(tags)];
    }, []);

    const filteredResearch = useMemo(() => {
        if (activeFilter === 'All') return research.research;
        return research.research.filter(r =>
            Array.isArray(r.keywords) && r.keywords.includes(activeFilter)
        );
    }, [activeFilter]);

    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6 text-zinc-50">
                Research
            </div>
            <p className="text-sm text-zinc-400 mb-4">
                Current and past research directions in LLMs, controllable generation, robustness, and causal NLP.
            </p>
            {filters.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`min-h-9 px-3 py-1.5 rounded-md text-xs md:text-sm border transition-colors ${
                                activeFilter === filter
                                    ? 'bg-cyan-300 text-zinc-950 border-cyan-300 shadow-sm'
                                    : 'bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}
            {filteredResearch.map(item => (
                <ResearchCard key={item.id} item={item}/>
            ))}
        </div>
    );
}


function ResearchCard({item}) {
    const cardContent = (
        <>
            <div className="flex items-center text-xs md:text-sm text-zinc-500">
                {item.status && (
                    <span className={`rounded-md border px-2 py-1 text-xs font-semibold
                        ${item.status === 'In Progress' ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200' :
                        'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'}`}>
                        {item.status}
                    </span>
                )}
            </div>
            <div className="text-xl md:text-2xl font-semibold my-2 text-zinc-50">
                {item.research_name}
            </div>
            {Array.isArray(item.company) && item.company.length > 0 && (
                <div className="my-1 text-sm text-zinc-300">
                    <span className="italic">{item.company.join(', ')}</span>
                </div>
            )}
            {item.project && (
                <div className="text-sm text-zinc-300 mb-1 italic">
                    <span className="font-medium text-zinc-200">Project:</span> {item.project}
                </div>
            )}
            {Array.isArray(item.instructor) && item.instructor.length > 0 && (
                <div className="text-sm text-zinc-300 mb-1 italic">
                    <span className="font-medium text-zinc-200">Instructor:</span> {item.instructor.join(', ')}
                </div>
            )}
            {Array.isArray(item.collaborators) && item.collaborators.length > 0 && (
                <div className="text-sm text-zinc-300 mb-1 italic">
                    <span className="font-medium text-zinc-200">Collaborators:</span> {item.collaborators.join(', ')}
                </div>
            )}
            {Array.isArray(item.abstract) && item.abstract.length > 0 && (
                <div className="mt-3 mb-4 text-sm md:text-base text-zinc-300">
                    {item.abstract.map((paragraph, index) => (
                        <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                </div>
            )}
            {Array.isArray(item.keywords) && item.keywords.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
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
            <div className="flex justify-end">
                {item.href && Object.entries(item.href).length > 0 && (
                    <p className="flex gap-3 text-sm md:text-md font-medium text-cyan-200">
                        {Object.entries(item.href).map(([key, value]) => (
                            <CustomLink href={value} key={key}>[{key}]</CustomLink>
                        ))}
                    </p>
                )}
            </div>
        </>
    );

    return (
        <div
            id={`research-${item.id}`}
            className="block relative mb-8 p-5 rounded-lg border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-950 shadow-lg shadow-black/20 hover:border-cyan-400/60 transition-colors">
            {cardContent}
        </div>
    );
}
