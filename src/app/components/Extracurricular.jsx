import experience from '../../../data/experience.json';
import React from "react";
import ExperienceCard from "@/app/components/ExperienceCard";

export default function Extracurricular() {
    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6">
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

