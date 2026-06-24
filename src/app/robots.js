const siteUrl = "https://kshitiztiwari.com";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
