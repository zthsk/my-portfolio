import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";

export default function ExperienceCard({item, compact = false}) {
    const content = (
        <>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div>
                    <h2 className={`${compact ? "text-xl" : "text-2xl md:text-3xl"} font-display font-medium text-zinc-50`}>{item.title}</h2>
                    <p className="mt-1 text-sm text-zinc-300">{item.company}</p>
                    {item.project_name && <p className="mt-1 text-sm text-zinc-400">{item.project_name}</p>}
                    {item.instructor && <p className="mt-1 text-sm text-zinc-400">Advisor: {item.instructor}</p>}
                </div>
                <div className="shrink-0 text-sm text-zinc-400 md:text-right">
                    <p>{item.start_date} - {item.end_date}</p>
                    <p className="mt-1">{item.location}</p>
                </div>
            </div>
            {item.description?.length > 0 && (
                <ul className={`mt-6 list-disc space-y-2 pl-5 ${compact ? "text-sm" : "text-sm md:text-base"} leading-7 text-zinc-300 marker:text-cyan-300`}>
                    {item.description.map((description) => <li key={description}>{description}</li>)}
                </ul>
            )}
            {item.href && <FontAwesomeIcon icon={faExternalLinkAlt} className="absolute right-4 top-4 text-xs text-zinc-400"/>}
        </>
    );
    const className = "relative block rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-lg shadow-black/15 transition-colors hover:border-cyan-400/60 md:p-6";

    return item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    ) : (
        <article className={className}>{content}</article>
    );
}
