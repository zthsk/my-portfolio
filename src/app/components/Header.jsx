import NavLink from './NavLink';
import Link from 'next/link';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import personalInfo from '../../../data/personalInfo.json';
import publications from '../../../data/publications.json';
import projects from '../../../data/projects.json';
import research from '../../../data/research.json';
import experience from "../../../data/experience.json";

function Header({scrolled}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header
            className={`z-20 pt-3 pb-3 mb-4 pl-0 top-0 right-0 left-0 border-b sticky w-full backdrop-blur-md transition-colors ${
                scrolled
                    ? 'bg-zinc-950/90 border-zinc-800 shadow-sm'
                    : 'bg-zinc-950/70 border-transparent'
            }`}>
            <div className="container mx-auto flex justify-between items-center px-5 w-full max-w-5xl">
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex items-center space-x-4">
                        <NavLink title="About" href="/"/>
                        {(experience.extracurricular.length > 0 || experience.job.length > 0 || experience.education.length > 0) && (<NavLink title="Experience" href="/experience"/>)}
                        {publications.publications.length > 0 && (<NavLink title="Publications" href="/publications"/>)}
                        {research.research.length > 0 && (<NavLink title="Research" href="/research"/>)}
                        {projects.projects.length > 0 && (<NavLink title="Projects" href="/projects"/>)}
                        <NavLink title="Blog" href="/blog"/>
                    </nav>
                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950/70 text-zinc-100 transition-colors hover:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" className="text-zinc-100"/>
                        </button>
                    </div>
                </div>
                <div className="flex items-center ml-auto pr-3 md:pr-0">
                    <Link
                        href="/"
                        className="font-display text-base font-medium tracking-normal text-zinc-100 transition-colors hover:text-cyan-200 md:text-lg"
                    >
                        {personalInfo.name}&apos;s Portfolio
                    </Link>
                </div>
            </div>
            {isOpen && (
                <nav className="md:hidden flex flex-col items-start space-y-3 px-5 pb-4 pt-2 bg-zinc-950/95 border-t border-zinc-800">
                    <NavLink title="About" href="/"/>
                    {(experience.extracurricular.length > 0 || experience.job.length > 0 || experience.education.length > 0) && (<NavLink title="Experience" href="/experience"/>)}
                    {publications.publications.length > 0 && (<NavLink title="Publications" href="/publications"/>)}
                    {research.research.length > 0 && (<NavLink title="Research" href="/research"/>)}
                    {projects.projects.length > 0 && (<NavLink title="Projects" href="/projects"/>)}
                    <NavLink title="Blog" href="/blog"/>
                </nav>
            )}
        </header>
    );
}


export default Header;
