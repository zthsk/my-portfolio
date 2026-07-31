import Content from "@/app/components/Content";
import NameCard from "@/app/components/NameCard";
import CredibilityStrip from "@/app/components/CredibilityStrip";
import {FeaturedProjects} from "@/app/components/Projects";
import {SelectedPublications} from "@/app/components/Publications";
import {LatestBlogPosts} from "@/app/components/Blog";
import About from "@/app/components/About";
import {getAllBlogPosts} from "@/lib/blog";
import personalInfo from "../../data/personalInfo.json";

export const metadata = {
    title: {absolute: `${personalInfo.name} | AI Research Engineer`},
    description: personalInfo.site_description,
    alternates: {canonical: "/"},
};

export default function Home() {
    const latestBlogPosts = getAllBlogPosts();
    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: personalInfo.name,
        url: "https://kshitiztiwari.com",
        image: "https://kshitiztiwari.com/images/avatar.jpeg",
        email: `mailto:${personalInfo.email}`,
        jobTitle: "AI Research Engineer",
        affiliation: {
            "@type": "CollegeOrUniversity",
            name: personalInfo.work_place,
            url: personalInfo.work_place_url,
        },
        sameAs: [
            personalInfo.social_media.linkedin,
            personalInfo.social_media.github,
            personalInfo.social_media.google_scholar,
        ].filter(Boolean),
        knowsAbout: personalInfo.research_interests,
    };

    return (
        <Content>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c")}}
            />
            <NameCard/>
            <CredibilityStrip/>
            <FeaturedProjects/>
            <SelectedPublications/>
            <LatestBlogPosts posts={latestBlogPosts}/>
            <About/>
        </Content>
    );
}
