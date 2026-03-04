"use client";

import Layout from "./Layout";
import personalInfo from '../../../data/personalInfo.json';

function Content({children }) {
    return (
        <Layout personalInfo={personalInfo}>
            <main className="flex flex-col max-w-5xl w-full mx-auto px-5 py-10 md:py-16 gap-10 leading-relaxed animate-fade-in-up">
                {children}
            </main>
        </Layout>
    );
}

export default Content;