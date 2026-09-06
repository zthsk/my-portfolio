import Content from "@/app/components/Content";
import Education from "@/app/components/Education";
import Experience from "@/app/components/Experience";
import Extracurricular from "@/app/components/Extracurricular";
import Talks from "@/app/components/Talks";
import experience from "../../../data/experience.json";
import personalInfo from "../../../data/personalInfo.json";

export const metadata = {
    title: "Experience",
    description: `${personalInfo.name}'s AI research engineering experience, education, workshops, and community leadership.`,
    alternates: {canonical: "/experience"},
};

export default function Page() {
    return (
        <Content>
            {experience.job.length > 0 && <Experience/>}
            {experience.education.length > 0 && <Education/>}
            <Talks/>
            {experience.extracurricular.length > 0 && <Extracurricular/>}
        </Content>
    );
}
