"use client";

import personalInfo from '../../../data/personalInfo.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faLinkedin,
    faGithub,
    faXTwitter,
    faInstagram,
    faFacebook,
    faGoogleScholar,
    faOrcid
} from '@fortawesome/free-brands-svg-icons';

const Box = ({href, label, onClick, children}) => (
    <a target="_blank"
       rel="noopener noreferrer"
       href={href}
       aria-label={label}
       className="flex items-center justify-center cursor-pointer transition-colors rounded-md select-none w-9 h-9 bg-zinc-950/70 border border-zinc-800 hover:border-cyan-300/80 hover:bg-zinc-900"
       onClick={onClick}>
        {children}
    </a>
);

const SocialMedia = () => {
    return (
        <div className="flex flex-wrap gap-2 max-w-full">
            {personalInfo.social_media.linkedin && (
                <Box href={personalInfo.social_media.linkedin} label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-sky-400"/>
                </Box>
            )}
            {personalInfo.social_media.X && (
                <Box href={personalInfo.social_media.X} label="X">
                    <FontAwesomeIcon icon={faXTwitter} size="lg" className="text-zinc-100"/>
                </Box>
            )}
            {personalInfo.social_media.instagram && (
                <Box href={personalInfo.social_media.instagram} label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} size="lg" className="text-pink-400"/>
                </Box>
            )}
            {personalInfo.social_media.facebook && (
                <Box href={personalInfo.social_media.facebook} label="Facebook">
                    <FontAwesomeIcon icon={faFacebook} size="lg" className="text-sky-500"/>
                </Box>
            )}
            {personalInfo.social_media.github && (
                <Box href={personalInfo.social_media.github} label="Github">
                    <FontAwesomeIcon icon={faGithub} size="lg" className="text-zinc-100"/>
                </Box>
            )}
            {personalInfo.social_media.google_scholar && (
                <Box href={personalInfo.social_media.google_scholar} label="Google Scholar">
                    <FontAwesomeIcon icon={faGoogleScholar} size="lg" className="text-emerald-300"/>
                </Box>
            )}
            {personalInfo.social_media.orcid && (
                <Box href={personalInfo.social_media.orcid} label="ORCID">
                    <FontAwesomeIcon icon={faOrcid} size="lg" className="text-emerald-400"/>
                </Box>
            )}
        </div>
    );
};

export default SocialMedia;
