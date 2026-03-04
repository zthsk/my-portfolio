"use client";

import personalInfo from '../../../data/personalInfo.json';
import React from "react";

function About() {
    return (
        <div className="flex flex-col w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6">
                About Me
            </div>
            <div className="space-y-4 text-slate-300 text-base md:text-lg">
                {personalInfo.self_description_detail.map((item, index) => (
                    <p key={index}>
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default About;