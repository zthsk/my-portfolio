import Content from "@/app/components/Content";
import Projects from "@/app/components/Projects";
import personalInfo from "../../../data/personalInfo.json";

export const metadata = {
    title: "Projects",
    description: `Selected AI, NLP, retrieval, and machine learning projects by ${personalInfo.name}.`,
    alternates: {
        canonical: "/projects",
    },
};

export default function Page(){
    return (
        <Content>
            <Projects />
        </Content>
    )
}
