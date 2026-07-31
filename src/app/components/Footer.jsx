import Link from "next/link";
import SocialMedia from "./SocialMedia";
import personalInfo from "../../../data/personalInfo.json";

export default function Footer() {
    return (
        <footer className="mt-6 w-full border-t border-zinc-800/80">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p>&copy; {new Date().getFullYear()} {personalInfo.name}</p>
                    <p className="mt-1">AI research, engineered for real systems.</p>
                </div>
                <div className="flex flex-col items-start gap-4 sm:items-end">
                    <SocialMedia/>
                    <div className="flex gap-4">
                        <Link href="/projects" className="transition-colors hover:text-cyan-200">Selected work</Link>
                        <a href={`mailto:${personalInfo.email}`} className="transition-colors hover:text-cyan-200">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
