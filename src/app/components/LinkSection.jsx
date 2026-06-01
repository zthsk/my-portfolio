import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import publications from "../../../data/publications.json";
import projects from "../../../data/projects.json";
import research from "../../../data/research.json";
import experience from "../../../data/experience.json";

const cards = [
  {
    title: "Experience",
    detail: "Research, teaching, and academic appointments",
    path: "/experience",
    condition: experience.extracurricular.length > 0 || experience.job.length > 0 || experience.education.length > 0
  },
  {
    title: "Publications",
    detail: "Peer-reviewed work and research outputs",
    path: "/publications",
    condition: publications.publications.length > 0
  },
  {
    title: "Research",
    detail: "Current directions in controllable and robust NLP",
    path: "/research",
    condition: research.research.length > 0
  },
  {
    title: "Projects",
    detail: `${projects.projects.length} public AI and NLP repositories`,
    path: "/projects",
    condition: projects.projects.length > 0
  }
];

function LinkSection() {
  const filteredCards = cards.filter((card) => card.condition);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {filteredCards.map((card) => (
        <Link key={card.path} href={card.path} className="group block">
          <div className="relative min-h-[132px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/70 p-5 transition-colors hover:border-cyan-400/60 hover:bg-zinc-950">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 opacity-70 group-hover:opacity-100"/>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-50 md:text-xl">
              {card.title}
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              {card.detail}
            </p>
            <div className="absolute bottom-4 right-4 text-zinc-500 transition-colors group-hover:text-cyan-200">
              <FontAwesomeIcon icon={faArrowRight} className="text-sm"/>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default LinkSection;
