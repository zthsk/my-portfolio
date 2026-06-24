import Content from "@/app/components/Content";
import Publications from "@/app/components/Publications";
import personalInfo from "../../../data/personalInfo.json";

export const metadata = {
    title: `Publications | ${personalInfo.name}`,
    description: `Selected publications and manuscripts by ${personalInfo.name}.`,
    alternates: {
        canonical: "/publications",
    },
};

export default function Page(){

    return (
        <Content>
            <Publications />
        </Content>
    )
}
