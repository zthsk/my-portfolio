import Content from "@/app/components/Content";
import {BlogArticle} from "@/app/components/Blog";
import {getAllBlogPosts, getBlogPostBySlug} from "@/lib/blog";
import personalInfo from "../../../../data/personalInfo.json";
import {notFound} from "next/navigation";

export function generateStaticParams() {
    return getAllBlogPosts().map((post) => ({
        slug: post.slug,
    }));
}

export function generateMetadata({params}) {
    const post = getBlogPostBySlug(params.slug);

    if (!post) {
        return {};
    }

    const image = post.image
        ? [
            {
                url: post.image,
                width: 1731,
                height: 909,
                alt: post.imageAlt || post.title,
            },
        ]
        : undefined;

    return {
        title: `${post.title} | ${personalInfo.name}`,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            type: "article",
            publishedTime: post.date,
            authors: [personalInfo.name],
            images: image,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : undefined,
        },
    };
}

export default function Page({params}) {
    const post = getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const postUrl = `https://kshitiztiwari.com/blog/${post.slug}`;
    const imageUrl = post.image ? `https://kshitiztiwari.com${post.image}` : undefined;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        url: postUrl,
        image: imageUrl,
        author: {
            "@type": "Person",
            name: personalInfo.name,
            url: "https://kshitiztiwari.com",
        },
        publisher: {
            "@type": "Person",
            name: personalInfo.name,
            url: "https://kshitiztiwari.com",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl,
        },
        keywords: post.tags.join(", "),
    };

    return (
        <Content>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")}}
            />
            <BlogArticle post={post}/>
        </Content>
    );
}
