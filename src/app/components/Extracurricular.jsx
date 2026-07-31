import experience from "../../../data/experience.json";
import ExperienceCard from "./ExperienceCard";

export default function Extracurricular() {
    return (
        <section>
            <div className="mb-6">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Leadership</p>
                <h2 className="font-display text-3xl font-medium text-zinc-50 md:text-4xl">Community experience</h2>
            </div>
            <div className="space-y-5">
                {experience.extracurricular.map((item) => <ExperienceCard key={item.id} item={item} compact/>) }
            </div>
        </section>
    );
}
