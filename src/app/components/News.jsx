"use client";

import React from "react";
import news from '../../../data/news.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export default function News() {
    const sortedNews = news.news.sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
        <div className="w-full mb-12">
            <div className="font-semibold text-2xl md:text-3xl tracking-tight mb-6">
                Recent News
            </div>
            {sortedNews.map(item => (
                item.href ? (
                    <a
                        key={item.id}
                        href={item.href}
                        className="block relative mb-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/95 hover:border-amber-400/80 hover:shadow-amber-500/20 shadow-md shadow-black/30 transition-all"
                    >
                        <div className="absolute bottom-3 right-3 text-slate-400">
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                        </div>
                        <div className="text-xs md:text-sm text-slate-400">{item.time}</div>
                        <div className="text-base md:text-lg text-slate-100 mt-1">{item.content}</div>
                    </a>
                ) : (
                    <div key={item.id} className="relative mb-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50">
                        <div className="text-xs md:text-sm text-slate-400">{item.time}</div>
                        <div className="text-base md:text-lg text-slate-100 mt-1">{item.content}</div>
                    </div>
                )
            ))}
        </div>
    );
}