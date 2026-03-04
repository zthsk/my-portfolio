 "use client";
import React, {useMemo, useState} from "react";
import Image from 'next/image';
import projects from '../../../data/projects.json';
import CustomLink from "@/app/components/CustomLink";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = useMemo(() => {
        const techs = new Set();
        projects.projects.forEach(p => {
            if (Array.isArray(p.technologies)) {
                p.technologies.forEach(t => techs.add(t));
            }
        });
        return ['All', ...Array.from(techs)];
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects.projects;
        return projects.projects.filter(p =>
            Array.isArray(p.technologies) && p.technologies.includes(activeFilter)
        );
    }, [activeFilter]);

    return (
        <div className="w-full mb-16">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-8">
                Projects
            </div>
            <p className="text-sm text-slate-400 mb-4">
                Selected engineering and research projects. Filter by tech stack to see where specific tools and models were used.
            </p>
            {filters.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${
                                activeFilter === filter
                                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                                    : 'bg-slate-900/60 text-slate-200 border-slate-700 hover:border-amber-400/70'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map(item => (
                    <ProjectCard key={item.id} project={item}/>
                ))}
            </div>
        </div>
    );
}

const defaultImage = '/images/default_project.jpeg';

function ProjectCard({project}) {
    const {id, title, description, image, href, technologies, status} = project;
    const imageUrl = image || defaultImage;

    const cardContent = (
        <>
            <div className="relative w-full h-52 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-2xl transform transition-transform duration-500 group-hover:scale-105"
                    priority={true}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0 to-slate-950/40 opacity-80" />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                        {title}
                    </h2>
                    {status && (
                        <span
                            className={`px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap
                            ${status.toLowerCase().includes('progress') ? 'bg-amber-100 text-amber-900' :
                              status.toLowerCase().includes('planned') ? 'bg-sky-100 text-sky-900' :
                              'bg-emerald-100 text-emerald-900'}`}
                        >
                            {status}
                        </span>
                    )}
                </div>
                {Array.isArray(technologies) && technologies.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs md:text-xs text-slate-100"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
                {description && description.length > 0 && (
                    <div className="text-slate-300 mb-4 text-sm md:text-base">
                        {description.map((desc, index) => (
                            <p key={index} className="mb-2">{desc}</p>
                        ))}
                    </div>
                )}
                <div className="flex justify-end">
                    {href && Object.entries(href).length > 0 && (
                        <p className="text-amber-300 flex gap-3 text-sm md:text-md font-medium">
                            {Object.entries(href).map(([key, value]) => (
                                <CustomLink href={value} key={key}>[{key}]</CustomLink>
                            ))}
                        </p>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <div
            id={`project-${id}`}
            className="group relative mb-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-amber-400/80 shadow-xl shadow-black/30 hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1">
            {cardContent}
        </div>
    );
}