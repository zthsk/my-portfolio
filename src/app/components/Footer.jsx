"use client";

import SocialMedia from './SocialMedia';
import personalInfo from '../../../data/personalInfo.json';

function Footer() {

    return (
        <footer className="w-full border-t border-slate-800/80 mt-4">
            <div
                className="mb-9 pb-0 px-6 max-w-5xl w-full flex flex-col-reverse md:flex-row items-center justify-between text-sm text-slate-400 m-auto pt-10">
                <p className="mt-4 md:mt-0">
                    &copy; {new Date().getFullYear()}. {personalInfo.name}
                </p>
                <div className="mb-4 md:mb-0">
                    <SocialMedia/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;