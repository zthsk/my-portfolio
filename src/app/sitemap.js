import {getAllBlogPosts} from "@/lib/blog";
import projects from "../../data/projects.json";

const siteUrl = "https://kshitiztiwari.com";
const portfolioUpdatedAt = new Date("2026-07-31");

export default function sitemap() {
    const posts = getAllBlogPosts();
    const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : portfolioUpdatedAt;
    const staticRoutes = ["", "/experience", "/publications", "/research", "/projects"].map((route) => ({
        url: `${siteUrl}${route || "/"}`,
        lastModified: portfolioUpdatedAt,
        changeFrequency: route === "" ? "monthly" : "yearly",
        priority: route === "" ? 1 : 0.7,
    }));
    const caseStudyRoutes = projects.projects
        .filter((project) => project.caseStudy)
        .map((project) => ({
            url: `${siteUrl}/projects/${project.slug}`,
            lastModified: portfolioUpdatedAt,
            changeFrequency: "yearly",
            priority: 0.8,
        }));
    const blogIndexRoute = {
        url: `${siteUrl}/blog`,
        lastModified: latestPostDate,
        changeFrequency: "monthly",
        priority: 0.8,
    };
    const blogRoutes = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : portfolioUpdatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...caseStudyRoutes, blogIndexRoute, ...blogRoutes];
}
