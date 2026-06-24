import Content from "@/app/components/Content";
import Education from "@/app/components/Education";
import Experience from "@/app/components/Experience";
import Extracurricular from "@/app/components/Extracurricular";
import experience from '../../../data/experience.json';
import personalInfo from "../../../data/personalInfo.json";

export const metadata = {
    title: `Experience | ${personalInfo.name}`,
    description: `${personalInfo.name}'s education, research, and professional experience.`,
    alternates: {
        canonical: "/experience",
    },
};

export default function Page() {
    return (
        <Content>
            {experience.education.length > 0 && <Education/>}

            {experience.job.length > 0 && <Experience/>}

            {experience.extracurricular.length > 0 && <Extracurricular/>}
        </Content>
    )
}
