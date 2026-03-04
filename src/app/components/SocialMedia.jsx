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
       className="flex items-center justify-center cursor-pointer transition-colors rounded-full select-none w-9 h-9 mx-1.5 bg-slate-900/60 border border-slate-700 hover:border-amber-400/80 hover:bg-slate-800/90"
       onClick={onClick}>
        {children}
    </a>
);

const SocialMedia = () => {
    return (
        <div className="flex flex-wrap justify-between max-w-full">
            {personalInfo.social_media.linkedin && (
                <Box href={personalInfo.social_media.linkedin} label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-sky-400"/>
                </Box>
            )}
            {personalInfo.social_media.X && (
                <Box href={personalInfo.social_media.X} label="X">
                    <FontAwesomeIcon icon={faXTwitter} size="lg" className="text-slate-100"/>
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
                    <FontAwesomeIcon icon={faGithub} size="lg" className="text-slate-100"/>
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