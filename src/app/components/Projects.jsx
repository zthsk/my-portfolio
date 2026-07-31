import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faExternalLinkAlt, faLock} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import projects from "../../../data/projects.json";

const defaultImage = "/images/default_project.jpeg";

export default function Projects() {
    const caseStudies = getFeaturedProjects();
    const otherProjects = projects.projects.filter((project) => !project.caseStudy);
    const publicProjectCount = projects.projects.filter((project) => project.visibility === "Public repository").length;

    return (
        <section className="w-full">
            <header className="mb-10 flex flex-col gap-4 border-b border-zinc-800 pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        Selected work
                    </p>
                    <h1 className="font-display text-4xl font-medium text-zinc-50 md:text-5xl">Projects</h1>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
                        AI systems and research code presented through the problem, my role, the engineering approach, and the evidence used to evaluate them.
                    </p>
                </div>
                <p className="shrink-0 font-mono text-xs text-zinc-400">{publicProjectCount} public repositories</p>
            </header>

            <div className="mb-14">
                <div className="mb-6">
                    <h2 className="font-display text-2xl font-medium text-zinc-50 md:text-3xl">Detailed case studies</h2>
                    <p className="mt-2 text-sm text-zinc-400">Three systems, documented from design decision to evaluation.</p>
                </div>
                <div className="grid gap-5 lg:grid-cols-3">
                    {caseStudies.map((project) => (
                        <ProjectCard key={project.slug} project={project} featured/>
                    ))}
                </div>
            </div>

            <div>
                <div className="mb-6">
                    <h2 className="font-display text-2xl font-medium text-zinc-50 md:text-3xl">Additional public work</h2>
                    <p className="mt-2 text-sm text-zinc-400">Applied NLP, retrieval, and peer-reviewed research implementations.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    {otherProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FeaturedProjects() {
    return (
        <section id="selected-work" className="scroll-mt-24 border-b border-zinc-800/80 pb-14 md:pb-20">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        Selected work
                    </p>
                    <h2 className="font-display text-3xl font-medium text-zinc-50 md:text-4xl">
                        Systems built to be tested, inspected, and trusted.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                        Each case study separates the problem, my contribution, the architecture, and the evidence behind the result.
                    </p>
                </div>
                <Link
                    href="/projects"
                    className="inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                    All projects
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
                {getFeaturedProjects().map((project) => (
                    <ProjectCard key={project.slug} project={project} featured/>
                ))}
            </div>
        </section>
    );
}

export function ProjectCaseStudy({project}) {
    const links = getValidLinks(project.href);

    return (
        <article className="w-full">
            <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs"/>
                All projects
            </Link>

            <header className="grid gap-8 border-b border-zinc-800 pb-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                <div>
                    <div className="mb-4 flex flex-wrap gap-2 text-xs">
                        <Badge>{project.category}</Badge>
                        <Badge>{project.lastUpdated || project.year}</Badge>
                        <StatusBadge status={project.status}/>
                    </div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        Case study · {project.visibility}
                    </p>
                    <h1 className="mt-3 text-balance font-display text-4xl font-medium leading-tight text-zinc-50 md:text-6xl">
                        {project.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                        {project.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                            <span key={technology} className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-1 font-mono text-xs text-zinc-300">
                                {technology}
                            </span>
                        ))}
                    </div>
                    {links.length > 0 && (
                        <div className="mt-7 flex flex-wrap gap-3">
                            {links.map(([label, value]) => (
                                <ProjectLink key={label} label={label} href={value}/>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/30">
                    <Image
                        src={project.image || defaultImage}
                        alt={`${project.title} system preview`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent"/>
                </div>
            </header>

            <div className="grid gap-10 py-10 md:grid-cols-[0.72fr_1.28fr] md:gap-14">
                <aside className="space-y-8">
                    <CaseStudySection label="The problem" title="Why this system exists" paragraphs={[project.problem]}/>
                    <CaseStudySection label="My role" title="What I owned" paragraphs={[project.role]}/>
                </aside>
                <div className="space-y-12">
                    <NumberedSection label="System design" title="How I approached it" items={project.approach}/>
                    <NumberedSection label="Evaluation" title="How I tested it" items={project.evaluation}/>
                    <NumberedSection label="Outcomes" title="What changed" items={project.outcomes}/>
                </div>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-display text-2xl text-zinc-50">Continue exploring</p>
                    <p className="mt-1 text-sm text-zinc-400">See the rest of the public engineering and research portfolio.</p>
                </div>
                <Link
                    href="/projects"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                >
                    View all projects
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                </Link>
            </div>
        </article>
    );
}

function ProjectCard({project, featured = false}) {
    const links = getValidLinks(project.href);
    const outcome = project.outcomes?.[0];

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/75 shadow-lg shadow-black/20 transition-colors hover:border-cyan-400/60">
            <div className={`relative w-full overflow-hidden bg-zinc-950 ${featured ? "h-40" : "h-44"}`}>
                <Image
                    src={project.image || defaultImage}
                    alt={`${project.title} project preview`}
                    fill
                    sizes={featured ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/5 to-transparent"/>
                {project.visibility === "Private case study" && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-950/90 px-2 py-1 text-xs text-zinc-300">
                        <FontAwesomeIcon icon={faLock} className="text-[10px]"/>
                        Private implementation
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                    <Badge>{project.category}</Badge>
                    <StatusBadge status={project.status}/>
                </div>
                <h3 className={`${featured ? "text-2xl" : "text-2xl"} font-display font-medium leading-tight text-zinc-50`}>
                    {project.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{project.subtitle}</p>

                {project.role && (
                    <p className="mt-4 text-sm leading-6 text-zinc-300">
                        <span className="font-semibold text-zinc-100">My role:</span> {project.role}
                    </p>
                )}
                {outcome && (
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        <span className="font-semibold text-zinc-300">Evidence:</span> {outcome}
                    </p>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.caseStudy && (
                        <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-cyan-300 px-3 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                        >
                            Read case study
                            <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                        </Link>
                    )}
                    {!project.caseStudy && links.map(([label, value]) => (
                        <ProjectLink key={label} label={label} href={value}/>
                    ))}
                </div>
            </div>
        </article>
    );
}

function ProjectLink({label, href}) {
    const isInternal = href.startsWith("/");
    const isGitHub = label.toLowerCase() === "github";
    const className = "inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";
    const content = (
        <>
            <FontAwesomeIcon icon={isGitHub ? faGithub : faExternalLinkAlt} className="text-sm"/>
            {label}
        </>
    );

    if (isInternal) {
        return <Link href={href} className={className}>{content}</Link>;
    }

    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
}

function Badge({children}) {
    return <span className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-1 text-zinc-300">{children}</span>;
}

function StatusBadge({status}) {
    return <span className={`rounded-md border px-2 py-1 text-xs font-medium ${getStatusClasses(status)}`}>{status}</span>;
}

function CaseStudySection({label, title, paragraphs}) {
    return (
        <section>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{label}</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-zinc-50">{title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-zinc-300">
                {paragraphs.filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
        </section>
    );
}

function NumberedSection({label, title, items = []}) {
    if (items.length === 0) return null;

    return (
        <section>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{label}</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-zinc-50">{title}</h2>
            <ol className="mt-5 grid gap-3">
                {items.map((item, index) => (
                    <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 rounded-lg border border-zinc-800 bg-zinc-950/65 p-4 text-sm leading-7 text-zinc-300">
                        <span className="font-mono text-xs text-cyan-300">{String(index + 1).padStart(2, "0")}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
}

function getFeaturedProjects() {
    return projects.projects
        .filter((project) => project.caseStudy && project.featuredRank)
        .sort((a, b) => a.featuredRank - b.featuredRank);
}

function getValidLinks(href = {}) {
    return Object.entries(href).filter(([, value]) => typeof value === "string" && value.trim().length > 0);
}

function getStatusClasses(status = "") {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus.includes("active") || normalizedStatus.includes("development") || normalizedStatus.includes("progress")) {
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
