import experience from '../../../data/experience.json';
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';


export default function Education() {
    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6">
                Education
            </div>
            <div>
                {experience.education.map((item) => (
                    <EducationCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    );
}


function EducationCard({item}) {
    const cardContent = (
        <>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <div className="font-semibold text-xl mb-1 text-slate-50">{item.degree}</div>
                    <div className="text-sm text-slate-300 mb-1">{item.school}</div>
                    {item.gpa && (
                        <div className="text-xs md:text-sm text-slate-400 mb-1">GPA: {item.gpa}</div>
                    )}
                    <div className="text-xs md:text-sm text-slate-400 mb-1 md:hidden">
                        {item.status === 'In Progress' ? `${item.start_date} - Estimated: ${item.end_date}` : `${item.start_date} - ${item.end_date}`}
                    </div>
                </div>
                <div className="md:w-1/2 text-right hidden md:block">
                    <div className="text-xs md:text-sm text-slate-400 mb-1">
                        {item.status === 'In Progress' ? `${item.start_date} - Estimated: ${item.end_date}` : `${item.start_date} - ${item.end_date}`}
                    </div>
                </div>
            </div>
            <div className="mt-2">
                {item.courses.length > 0 && (
                    <div className="mb-4">
                        <div className="font-medium text-slate-200 mb-1">Courses:</div>
                        <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 text-sm md:text-base text-slate-300">
                            {item.courses.map((course, index) => (
                                <li key={index} className="mr-2">{course}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {item.other_info.length > 0 && (
                    <div className="mb-2">
                        <div className="font-medium text-slate-200 mb-1">Special:</div>
                        <ul className="list-disc list-inside text-sm md:text-base text-slate-300 space-y-1.5">
                            {item.other_info.map((other, index) => (
                                <li key={index}>{other}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {item.href && (
                <div className="absolute bottom-3 right-3 hidden md:block text-slate-400">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm"/>
                </div>
            )}
        </>
    );

    return item.href ? (
        <a href={item.href}
           className="block relative mb-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-black/30 hover:bg-slate-900/95 hover:border-amber-400/80 hover:shadow-amber-500/20 transition-all">
            <div className="absolute top-3 right-3 md:hidden text-slate-400">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm"/>
            </div>
            {cardContent}
        </a>
    ) : (
        <div className="mb-6 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/30 relative">
            {cardContent}
        </div>
    );
}

