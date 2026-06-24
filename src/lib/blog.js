import fs from "fs";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export function getAllBlogPosts() {
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }

    return fs
        .readdirSync(blogDirectory)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => getBlogPostBySlug(fileName.replace(/\.md$/, "")))
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogPostBySlug(slug) {
    if (!/^[a-z0-9-]+$/.test(slug)) {
        return null;
    }

    const filePath = path.join(blogDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const rawPost = fs.readFileSync(filePath, "utf8");
    const {frontmatter, content} = parseFrontmatter(rawPost);

    return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || "",
        displayDate: formatDate(frontmatter.date),
        excerpt: frontmatter.excerpt || "",
        image: frontmatter.image || "",
        imageAlt: frontmatter.imageAlt || "",
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        readingTime: getReadingTime(content),
        blocks: parseMarkdownBlocks(content),
    };
}

function parseFrontmatter(rawPost) {
    if (!rawPost.startsWith("---")) {
        return {frontmatter: {}, content: rawPost.trim()};
    }

    const closingMarker = rawPost.indexOf("\n---", 3);

    if (closingMarker === -1) {
        return {frontmatter: {}, content: rawPost.trim()};
    }

    const frontmatterText = rawPost.slice(3, closingMarker).trim();
    const content = rawPost.slice(closingMarker + 4).trim();
    const frontmatter = {};
    const lines = frontmatterText.split("\n");

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

        if (!match) {
            continue;
        }

        const [, key, value] = match;

        if (value) {
            frontmatter[key] = parseFrontmatterValue(value);
            continue;
        }

        const values = [];
        let nextIndex = index + 1;

        while (nextIndex < lines.length) {
            const listMatch = lines[nextIndex].match(/^\s*-\s+(.+)$/);

            if (!listMatch) {
                break;
            }

            values.push(parseFrontmatterValue(listMatch[1]));
            nextIndex += 1;
        }

        frontmatter[key] = values;
        index = nextIndex - 1;
    }

    return {frontmatter, content};
}

function parseFrontmatterValue(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) {
        return trimmedValue
            .slice(1, -1)
            .split(",")
            .map((item) => stripQuotes(item.trim()))
            .filter(Boolean);
    }

    return stripQuotes(trimmedValue);
}

function stripQuotes(value) {
    return value.replace(/^["']|["']$/g, "");
}

function formatDate(date) {
    if (!date) {
        return "";
    }

    return new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(date));
}

function getReadingTime(content) {
    const words = content.trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 220));
}

function parseMarkdownBlocks(content) {
    const lines = content.replace(/\r\n/g, "\n").split("\n");
    const blocks = [];
    let index = 0;

    while (index < lines.length) {
        const line = lines[index].trim();

        if (!line) {
            index += 1;
            continue;
        }

        const headingMatch = line.match(/^(#{2,4})\s+(.+)$/);

        if (headingMatch) {
            blocks.push({
                type: "heading",
                level: headingMatch[1].length,
                text: headingMatch[2],
            });
            index += 1;
            continue;
        }

        if (line.startsWith("- ")) {
            const items = [];

            while (index < lines.length && lines[index].trim().startsWith("- ")) {
                items.push(lines[index].trim().replace(/^-\s+/, ""));
                index += 1;
            }

            blocks.push({type: "list", items});
            continue;
        }

        const paragraphLines = [];

        while (index < lines.length) {
            const currentLine = lines[index].trim();

            if (
                !currentLine ||
                currentLine.startsWith("- ") ||
                currentLine.match(/^(#{2,4})\s+/)
            ) {
                break;
            }

            paragraphLines.push(currentLine);
            index += 1;
        }

        blocks.push({
            type: "paragraph",
            text: paragraphLines.join(" "),
        });
    }

    return blocks;
}
