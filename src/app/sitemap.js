import {getAllBlogPosts} from "@/lib/blog";

const siteUrl = "https://kshitiztiwari.com";

export default function sitemap() {
    const now = new Date();
    const posts = getAllBlogPosts();
    const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : now;
    const staticRoutes = ["", "/experience", "/publications", "/research", "/projects"].map((route) => ({
        url: `${siteUrl}${route || "/"}`,
        lastModified: now,
        changeFrequency: route === "" ? "monthly" : "yearly",
        priority: route === "" ? 1 : 0.7,
    }));

    const blogIndexRoute = {
        url: `${siteUrl}/blog`,
        lastModified: latestPostDate,
        changeFrequency: "monthly",
        priority: 0.8,
    };

    const blogRoutes = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...staticRoutes, blogIndexRoute, ...blogRoutes];
}
