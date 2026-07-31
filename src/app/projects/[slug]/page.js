import {notFound} from "next/navigation";
import Content from "@/app/components/Content";
import {ProjectCaseStudy} from "@/app/components/Projects";
import projects from "../../../../data/projects.json";
import personalInfo from "../../../../data/personalInfo.json";

export function generateStaticParams() {
    return projects.projects
        .filter((project) => project.caseStudy)
        .map((project) => ({slug: project.slug}));
}

export async function generateMetadata({params}) {
    const {slug} = await params;
    const project = projects.projects.find((item) => item.slug === slug && item.caseStudy);

    if (!project) return {};

    return {
        title: `${project.title} Case Study`,
        description: project.description[0],
        alternates: {canonical: `/projects/${project.slug}`},
        openGraph: {
            title: `${project.title} Case Study | ${personalInfo.name}`,
            description: project.description[0],
            url: `/projects/${project.slug}`,
            type: "article",
            images: project.image ? [{url: project.image, alt: `${project.title} system preview`}] : undefined,
        },
    };
}

export default async function Page({params}) {
    const {slug} = await params;
    const project = projects.projects.find((item) => item.slug === slug && item.caseStudy);

    if (!project) notFound();

    return (
        <Content>
            <ProjectCaseStudy project={project}/>
        </Content>
    );
}
