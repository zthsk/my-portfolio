import Content from "@/app/components/Content";
import Research from "@/app/components/Research";
import personalInfo from "../../../data/personalInfo.json";

export const metadata = {
    title: "Research",
    description: `Research directions by ${personalInfo.name} in LLMs, NLP, robustness, controllable generation, and causal AI.`,
    alternates: {
        canonical: "/research",
    },
};

export default function Page(){
    return (
        <Content>
            <Research />
        </Content>
    )
}
