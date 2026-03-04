import experience from '../../../data/experience.json';
import React from "react";
import ExperienceCard from "./ExperienceCard";


export default function Experience() {
    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6">
                Experience
            </div>
            <p className="text-sm text-slate-400 mb-4">
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