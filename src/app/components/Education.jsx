import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import experience from "../../../data/experience.json";

export default function Education() {
    return (
        <section>
            <div className="mb-6">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Academic background</p>
                <h2 className="font-display text-3xl font-medium text-zinc-50 md:text-4xl">Education</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                {experience.education.map((item) => <EducationCard key={item.id} item={item}/>) }
            </div>
        </section>
    );
}

function EducationCard({item}) {
    return (
        <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl border border-zinc-800 bg-zinc-950/65 p-5 transition-colors hover:border-cyan-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="absolute right-4 top-4 text-xs text-zinc-600 group-hover:text-cyan-200"/>
            <p className="pr-6 font-display text-xl font-medium leading-tight text-zinc-50">{item.degree}</p>
            <p className="mt-2 text-sm text-zinc-300">{item.school}</p>
            <p className="mt-3 font-mono text-xs text-cyan-200">{item.status}</p>
            {item.other_info?.map((detail) => (
                <p key={detail} className="mt-3 text-xs leading-5 text-zinc-400">{detail}</p>
            ))}
        </a>
    );
}
