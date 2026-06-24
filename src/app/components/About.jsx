"use client";

import personalInfo from '../../../data/personalInfo.json';
import React from "react";

function About() {
    return (
        <div className="flex flex-col w-full mb-12">
            <div className="font-display text-3xl font-medium tracking-normal mb-6 text-zinc-50 md:text-4xl">
                About Me
            </div>
            <div className="space-y-4 text-zinc-300 text-base md:text-lg">
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
