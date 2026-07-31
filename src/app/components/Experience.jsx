import experience from "../../../data/experience.json";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
    return (
        <section>
            <div className="mb-6">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Technical experience</p>
                <h1 className="font-display text-4xl font-medium text-zinc-50 md:text-5xl">Experience</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
                    Research engineering work centered on controllable language models, adversarial robustness, and evaluation systems.
                </p>
            </div>
            <div className="space-y-5">
                {experience.job.map((item) => <ExperienceCard key={item.id} item={item}/>) }
            </div>
        </section>
    );
}
