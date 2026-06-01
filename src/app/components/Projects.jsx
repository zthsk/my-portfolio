"use client";

import React, {useMemo, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import projects from "../../../data/projects.json";

const defaultImage = "/images/default_project.jpeg";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = useMemo(() => {
        const categories = new Set();
        projects.projects.forEach((project) => {
            if (project.category) {
                categories.add(project.category);
            }
        });
        return ["All", ...Array.from(categories)];
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") {
            return projects.projects;
        }

        return projects.projects.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <section className="w-full mb-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        Public Work
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                        Projects
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                        Curated AI systems, NLP research code, and retrieval projects with public repositories.
                    </p>
                </div>
                <p className="text-sm text-zinc-500">
                    {projects.projects.length} public repos
                </p>
            </div>

            {filters.length > 1 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`min-h-9 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors md:text-sm ${
                                activeFilter === filter
                                    ? "border-cyan-300 bg-cyan-300 text-zinc-950"
                                    : "border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </section>
    );
}

export function FeaturedProjects() {
    const featuredProjects = projects.projects.filter((project) => project.featured).slice(0, 3);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <section className="w-full border-b border-zinc-800/80 pb-12">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        Featured Projects
                    </p>
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-50 md:text-2xl">
                        Recent public AI systems
                    </h2>
                </div>
                <Link
                    href="/projects"
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-300 hover:text-cyan-200"
                >
                    View all
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} compact/>
                ))}
            </div>
        </section>
    );
}

function ProjectCard({project, compact = false}) {
    const {
        id,
        title,
        subtitle,
        description = [],
        image,
        href,
        technologies = [],
        status,
        category,
        year,
        lastUpdated
    } = project;
    const imageUrl = image || defaultImage;
    const visibleDescription = compact ? description.slice(0, 1) : description;
    const visibleTechnologies = compact ? technologies.slice(0, 4) : technologies;
    const hiddenTechnologyCount = technologies.length - visibleTechnologies.length;

    return (
        <article
            id={`project-${id}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/75 shadow-lg shadow-black/20 transition-colors duration-300 hover:border-cyan-400/60 hover:bg-zinc-950"
        >
            <div className={`relative w-full overflow-hidden bg-zinc-950 ${compact ? "h-36" : "h-48 md:h-52"}`}>
                <Image
                    src={imageUrl}
                    alt={`${title} project thumbnail`}
                    fill
                    sizes={compact ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={!compact && id <= 2}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent"/>
            </div>

            <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    {category && (
                        <span className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-1 text-zinc-300">
                            {category}
                        </span>
                    )}
                    {(lastUpdated || year) && (
                        <span className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1">
                            {lastUpdated || year}
                        </span>
                    )}
                    {status && (
                        <span className={`rounded-md border px-2 py-1 font-medium ${getStatusClasses(status)}`}>
                            {status}
                        </span>
                    )}
                </div>

                <h2 className={`${compact ? "text-lg" : "text-xl md:text-2xl"} break-words font-semibold leading-tight tracking-tight text-zinc-50`}>
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {subtitle}
                    </p>
                )}

                {visibleTechnologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {visibleTechnologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-xs text-zinc-300"
                            >
                                {tech}
                            </span>
                        ))}
                        {hiddenTechnologyCount > 0 && (
                            <span className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-xs text-zinc-500">
                                +{hiddenTechnologyCount}
                            </span>
                        )}
                    </div>
                )}

                {visibleDescription.length > 0 && (
                    <div className={`${compact ? "mt-4 text-sm" : "mt-5 text-sm md:text-base"} space-y-3 leading-7 text-zinc-300`}>
                        {visibleDescription.map((desc, index) => (
                            <p key={index}>{desc}</p>
                        ))}
                    </div>
                )}

                {href && Object.entries(href).length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2 pt-1">
                        {Object.entries(href).map(([label, value]) => {
                            const isGithub = label.toLowerCase() === "github";

                            return (
                                <a
                                    href={value}
                                    key={label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-9 items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-cyan-300 hover:text-cyan-200"
                                >
                                    <FontAwesomeIcon
                                        icon={isGithub ? faGithub : faExternalLinkAlt}
                                        className="text-sm"
                                    />
                                    {isGithub ? "GitHub" : label}
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </article>
    );
}

function getStatusClasses(status) {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus.includes("active") || normalizedStatus.includes("progress")) {
        return "border-cyan-400/40 bg-cyan-400/10 text-cyan-200";
    }

    if (normalizedStatus.includes("published")) {
        return "border-violet-400/40 bg-violet-400/10 text-violet-200";
    }

    if (normalizedStatus.includes("completed")) {
        return "border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
    }

    return "border-zinc-700 bg-zinc-900 text-zinc-300";
}
