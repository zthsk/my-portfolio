import Link from "next/link";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faCalendarAlt, faClock} from "@fortawesome/free-solid-svg-icons";

export function BlogIndex({posts}) {
    return (
        <section className="w-full mb-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        Writing
                    </p>
                    <h1 className="font-display text-3xl font-medium tracking-normal text-zinc-50 md:text-4xl">
                        Blog
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                        Posts on applied AI systems, NLP, hiring infrastructure, and evidence-driven software.
                    </p>
                </div>
                <p className="text-sm text-zinc-400">
                    {posts.length} {posts.length === 1 ? "post" : "posts"}
                </p>
            </div>

            {posts.length > 0 ? (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} variant="list"/>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-5 text-sm text-zinc-400">
                    No posts published yet.
                </div>
            )}
        </section>
    );
}

export function LatestBlogPosts({posts}) {
    const latestPosts = posts.slice(0, 3);

    if (latestPosts.length === 0) {
        return null;
    }

    return (
        <section className="w-full border-b border-zinc-800/80 pb-12">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        Writing
                    </p>
                    <h2 className="font-display text-2xl font-medium tracking-normal text-zinc-50 md:text-3xl">
                        Latest blog posts
                    </h2>
                </div>
                <Link
                    href="/blog"
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/70 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-300 hover:text-cyan-200"
                >
                    View all
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {latestPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} compact/>
                ))}
            </div>
        </section>
    );
}

export function BlogArticle({post}) {
    const relatedCaseStudy = post.slug === "why-evaluation-matters-llm-agentic-ai"
        ? {href: "/projects/tracelayer", title: "TraceLayer case study"}
        : null;

    return (
        <article className="mx-auto w-full max-w-5xl">
            <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-200"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs"/>
                Blog
            </Link>

            <header className="border-b border-zinc-800 pb-8">
                {post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <h1 className="max-w-4xl font-display text-3xl font-medium leading-tight tracking-normal text-zinc-50 sm:text-4xl md:text-6xl">
                    {post.title}
                </h1>

                {post.excerpt && (
                    <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
                        {post.excerpt}
                    </p>
                )}

                <PostMeta post={post} className="mt-5 text-zinc-400"/>

                {post.image && (
                    <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/20">
                        <Image
                            src={post.image}
                            alt={post.imageAlt || `${post.title} cover image`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </header>

            <div className="mx-auto mt-8 w-full max-w-3xl space-y-5 text-zinc-300">
                {relatedCaseStudy && (
                    <aside className="mb-8 rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-5">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Related system</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                            See the condensed system design, evaluation gates, and outcomes behind this article.
                        </p>
                        <Link href={relatedCaseStudy.href} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                            {relatedCaseStudy.title}
                            <FontAwesomeIcon icon={faArrowRight} className="text-xs"/>
                        </Link>
                    </aside>
                )}
                {post.blocks.map((block, index) => renderBlock(block, index))}
            </div>
        </article>
    );
}

function BlogCard({post, compact = false, variant = "card"}) {
    if (compact) {
        return <CompactBlogCard post={post}/>;
    }

    if (variant === "list") {
        return <BlogListCard post={post}/>;
    }

    return <CompactBlogCard post={post}/>;
}

function CompactBlogCard({post}) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/75 shadow-lg shadow-black/20 transition-colors hover:border-cyan-400/60 hover:bg-zinc-950"
        >
            <article className="flex h-full flex-col">
                {post.image && (
                    <div className="relative h-36 w-full overflow-hidden bg-zinc-950">
                        <Image
                            src={post.image}
                            alt={post.imageAlt || `${post.title} cover image`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"/>
                    </div>
                )}

                <div className="flex flex-1 flex-col p-4">
                    <PostMeta post={post} className="mb-3 text-zinc-400"/>

                    <h2 className="font-display text-xl font-medium leading-tight tracking-normal text-zinc-50 transition-colors group-hover:text-cyan-100">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                        Read post
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-0.5"/>
                    </div>
                </div>
            </article>
        </Link>
    );
}

function BlogListCard({post}) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/70 shadow-lg shadow-black/20 transition-colors hover:border-cyan-400/60 hover:bg-zinc-950"
        >
            <article className="flex flex-col md:flex-row">
                {post.image && (
                    <div className="relative h-44 w-full shrink-0 overflow-hidden bg-zinc-950 md:h-auto md:min-h-52 md:w-64 lg:w-72">
                        <Image
                            src={post.image}
                            alt={post.imageAlt || `${post.title} cover image`}
                            fill
                            sizes="(max-width: 768px) 100vw, 288px"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                    <PostMeta post={post} className="mb-3 text-zinc-400"/>

                    <h2 className="font-display text-2xl font-medium leading-tight tracking-normal text-zinc-50 transition-colors group-hover:text-cyan-100 md:text-3xl">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
                            {post.excerpt}
                        </p>
                    )}

                    {post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-1 text-xs text-zinc-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                        Read post
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-0.5"/>
                    </div>
                </div>
            </article>
        </Link>
    );
}

function PostMeta({post, className = ""}) {
    return (
        <div className={`flex flex-wrap gap-3 text-xs ${className}`}>
            {post.displayDate && (
                <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-xs"/>
                    <time dateTime={post.date}>{post.displayDate}</time>
                </span>
            )}
            <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-xs"/>
                {post.readingTime} min read
            </span>
        </div>
    );
}

function renderBlock(block, index) {
    if (block.type === "heading") {
        const HeadingTag = block.level === 3 ? "h3" : "h2";
        const headingClassName = block.level === 3
            ? "mt-8 font-display text-2xl font-medium tracking-normal text-zinc-50 md:text-3xl"
            : "mt-12 font-display text-3xl font-medium tracking-normal text-zinc-50 md:text-4xl";

        return (
            <HeadingTag key={`heading-${index}`} className={headingClassName}>
                {block.text}
            </HeadingTag>
        );
    }

    if (block.type === "list") {
        return (
            <ul key={`list-${index}`} className="list-disc space-y-2 pl-6 text-sm leading-7 text-zinc-300 md:text-base">
                {block.items.map((item) => (
                    <li key={item}>{renderInlineMarkdown(item)}</li>
                ))}
            </ul>
        );
    }

    if (block.type === "references") {
        return (
            <ol key={`references-${index}`} className="list-none space-y-4 text-sm leading-6 text-zinc-400 md:text-base md:leading-7">
                {block.items.map((item) => (
                    <li
                        key={item.id}
                        id={`reference-${item.id}`}
                        className="grid scroll-mt-24 grid-cols-[auto_1fr] gap-3"
                    >
                        <span className="font-mono text-xs font-semibold text-cyan-300 md:pt-0.5">
                            [{item.id}]
                        </span>
                        <span>{renderInlineMarkdown(item.text)}</span>
                    </li>
                ))}
            </ol>
        );
    }

    return (
        <p key={`paragraph-${index}`} className="text-sm leading-7 text-zinc-300 md:text-base">
            {renderInlineMarkdown(block.text)}
        </p>
    );
}

function renderInlineMarkdown(text) {
    const tokenPattern = /(\[\^\d+\]|\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

    return text.split(tokenPattern).filter(Boolean).map((part, index) => {
        const citationMatch = part.match(/^\[\^(\d+)\]$/);

        if (citationMatch) {
            const referenceId = citationMatch[1];

            return (
                <sup key={`citation-${referenceId}-${index}`} className="ml-0.5 align-super text-[0.72em] leading-none">
                    <a
                        href={`#reference-${referenceId}`}
                        aria-label={`Reference ${referenceId}`}
                        className="font-mono font-semibold text-cyan-300 no-underline transition-colors hover:text-cyan-100"
                    >
                        [{referenceId}]
                    </a>
                </sup>
            );
        }

        const linkMatch = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)$/);

        if (linkMatch) {
            const [, label, href] = linkMatch;
            const className = "font-medium text-cyan-200 underline decoration-cyan-400/40 underline-offset-4 transition-colors hover:text-cyan-100";

            if (href.startsWith("/")) {
                return <Link key={`${href}-${index}`} href={href} className={className}>{label}</Link>;
            }

            return (
                <a
                    key={`${href}-${index}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                >
                    {label}
                </a>
            );
        }

        if (part.startsWith("`") && part.endsWith("`")) {
            return (
                <code key={`code-${index}`} className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.9em] text-cyan-100">
                    {part.slice(1, -1)}
                </code>
            );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={`strong-${index}`} className="font-semibold text-zinc-100">{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith("*") && part.endsWith("*")) {
            return <em key={`emphasis-${index}`}>{part.slice(1, -1)}</em>;
        }

        return part;
    });
}
