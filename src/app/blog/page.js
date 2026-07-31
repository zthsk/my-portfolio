import Content from "@/app/components/Content";
import {BlogIndex} from "@/app/components/Blog";
import {getAllBlogPosts} from "@/lib/blog";
import personalInfo from "../../../data/personalInfo.json";

export const metadata = {
    title: "Writing",
    description: `Writing by ${personalInfo.name} on applied AI, NLP, and software systems.`,
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: `Writing | ${personalInfo.name}`,
        description: `Writing by ${personalInfo.name} on applied AI, NLP, and software systems.`,
        url: "/blog",
        type: "website",
    },
};

export default function Page() {
    const posts = getAllBlogPosts();

    return (
        <Content>
            <BlogIndex posts={posts}/>
        </Content>
    );
}
