import experience from '../../../data/experience.json';
import React from "react";
import ExperienceCard from "./ExperienceCard";


export default function Experience() {
    return (
        <div className="w-full mb-12">
            <div className="font-display text-3xl font-medium tracking-normal mb-6 text-zinc-50 md:text-4xl">
                Experience
            </div>
            <p className="text-sm text-zinc-400 mb-4">
                Research, teaching, and leadership roles that shaped my work in machine learning and NLP.
            </p>
            <div>
                {experience.job.map((item) => (
                    <ExperienceCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    );
}
