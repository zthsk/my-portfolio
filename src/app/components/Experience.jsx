import experience from '../../../data/experience.json';
import React from "react";
import ExperienceCard from "./ExperienceCard";


export default function Experience() {
    return (
        <div className="w-full mb-10">
            <div className="font-bold text-xl md:text-3xl mb-10">
                Experience
            </div>
            <div>
                {experience.job.map((item) => (
                    <ExperienceCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    );
}