import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import publications from '../../../data/publications.json';
import projects from '../../../data/projects.json';
import research from '../../../data/research.json';
import experience from "../../../data/experience.json";

const cards = [
  { title: 'Experience', path: '/experience', condition: experience.extracurricular.length > 0 || experience.job.length > 0 || experience.education.length > 0 },
  { title: 'Publications', path: '/publications', condition: publications.publications.length > 0 },
  { title: 'Research', path: '/research', condition: research.research.length > 0 },
  { title: 'Projects', path: '/projects', condition: projects.projects.length > 0 },
];

function LinkSection() {
  const filteredCards = cards.filter(card => card.condition);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-full">
      {filteredCards.map((card, index) => (
        <Link key={index} href={card.path} passHref>
          <div
              className="group relative block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-amber-400/80 shadow-lg shadow-black/30 hover:shadow-amber-500/20 transition-all min-h-[150px] md:min-h-[190px] p-5 md:p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 opacity-70 group-hover:opacity-100"/>
              <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-50 mb-2 md:mb-3">
                  {card.title}
              </h2>
              <div className="absolute bottom-4 right-4 text-slate-400 group-hover:text-amber-300 transition-colors">
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="text-lg md:text-xl" />
              </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default LinkSection;