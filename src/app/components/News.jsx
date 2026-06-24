"use client";

import React from "react";
import news from '../../../data/news.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export default function News() {
    const sortedNews = news.news.sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
        <div className="w-full mb-12">
            <div className="font-display text-3xl font-medium tracking-normal mb-6 text-zinc-50 md:text-4xl">
                Recent News
            </div>
            {sortedNews.map(item => (
                item.href ? (
                    <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative mb-4 p-4 rounded-lg border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-950 hover:border-cyan-400/60 shadow-md shadow-black/20 transition-colors"
                    >
                        <div className="absolute bottom-3 right-3 text-zinc-500">
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                        </div>
                        <div className="text-xs md:text-sm text-zinc-500">{item.time}</div>
                        <div className="text-base md:text-lg text-zinc-100 mt-1">{item.content}</div>
                    </a>
                ) : (
                    <div key={item.id} className="relative mb-4 p-4 rounded-lg border border-zinc-800 bg-zinc-950/50">
                        <div className="text-xs md:text-sm text-zinc-500">{item.time}</div>
                        <div className="text-base md:text-lg text-zinc-100 mt-1">{item.content}</div>
                    </div>
                )
            ))}
        </div>
    );
}
