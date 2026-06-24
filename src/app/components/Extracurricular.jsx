import experience from '../../../data/experience.json';
import React from "react";
import ExperienceCard from "@/app/components/ExperienceCard";

export default function Extracurricular() {
    return (
        <div className="w-full mb-12">
            <div className="font-display text-3xl font-medium tracking-normal mb-6 text-zinc-50 md:text-4xl">
                Extracurricular
            </div>
            <div>
                {experience.extracurricular.map((item) => (
                    <ExperienceCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    );
}
