import personalInfo from "../../../data/personalInfo.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGoogleScholar, faLinkedin} from "@fortawesome/free-brands-svg-icons";

const socialLinks = [
    {key: "linkedin", label: "LinkedIn", icon: faLinkedin, iconClass: "text-sky-400"},
    {key: "github", label: "GitHub", icon: faGithub, iconClass: "text-zinc-100"},
    {key: "google_scholar", label: "Google Scholar", icon: faGoogleScholar, iconClass: "text-emerald-300"},
];

export default function SocialMedia() {
    return (
        <div className="flex flex-wrap gap-2" aria-label="Professional profiles">
            {socialLinks.map(({key, label, icon, iconClass}) => {
                const href = personalInfo.social_media[key];

                if (!href) return null;

                return (
                    <a
                        key={key}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={href}
                        aria-label={label}
                        title={label}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950/70 transition-colors hover:border-cyan-300/80 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                        <FontAwesomeIcon icon={icon} className={iconClass}/>
                    </a>
                );
            })}
        </div>
    );
}
