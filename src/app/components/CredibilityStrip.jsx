import personalInfo from "../../../data/personalInfo.json";

export default function CredibilityStrip() {
    return (
        <section aria-label="Professional highlights" className="-mt-8 md:-mt-12">
            <dl className="grid overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/75 sm:grid-cols-2 lg:grid-cols-4">
                {personalInfo.proof_points.map((item, index) => (
                    <div
                        key={item.label}
                        className={`p-5 ${index > 0 ? "border-t border-zinc-800 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0" : ""}`}
                    >
                        <dt className="text-xs leading-5 text-zinc-400">{item.label}</dt>
                        <dd className="mt-1 font-display text-xl font-medium text-zinc-100">{item.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
