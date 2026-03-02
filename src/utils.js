import { readFileSync } from "fs";
import { getCollection } from "astro:content";
import { html } from "satori-html";
import { SITE_TITLE, SITE_AUTHOR } from "./consts.ts";
import satori from "satori";
import sharp from "sharp";

export async function getPosts() {
    return (await getCollection("blog", ({ data }) => !data.draft));
}

export async function getSortedPosts() {
    return (await getPosts()).sort((p1, p2) => {
        const d1 = p1.data.published || p1.data.modified;
        const d2 = p2.data.published || p2.data.modified;
        return d2.valueOf() - d1.valueOf();
    });
}

export async function getGroupedPosts() {
    const posts = await getSortedPosts();
    let res = {};

    for (const p of posts) {
        const year = p.data.published.getFullYear();

        if (Array.isArray(res[year]))
            res[year].push(p);
        else
            res[year] = [p];
    }

    return res;
}

export async function getTags(posts) {
    if (!Array.isArray(posts))
        posts = await getSortedPosts();

    let res = {}

    for (const p of posts) {
        // Make post's tags unique
        const s = new Set(p.data.tags);

        for (const tag of s) {
            if (tag in res)
                res[tag]++;
            else
                res[tag] = 1;
        }
    }

    return res;
}

export function getPostsByTag(posts, tag) {
    let res = [];

    for (const p of posts) {
        if (p.data.tags.includes(tag))
            res.push(p)
    }

    return res;
}

export async function getImagePng(title) {
    const MARKUP = html(`
        <div style="width: 100%; height: 100%; display: flex; background-color: #202020; color: #f4f1d6;">
            <div style="display: flex; position: absolute; left: 4%; top: 2%; width: 94%; height: 92%; border: 2px solid #404040; background-color: #303030;"></div>
            <div style="display: flex; flex-direction: column; box-sizing: border-box; padding: 52px 56px 44px 56px; position: absolute; left: 2%; top: 6%; width: 94%; height: 92%; border: 2px solid #f4f1d6; background-color: #202020;">
                <div style="display: flex; flex-direction: column; flex: 1; justify-content: center;">
                    <div style="font-size: 62px; font-weight: 700; letter-spacing: -1px; line-height: 1.15; margin: 0;">${title}</div>
                </div>
                <div style="display: flex; width: 56px; height: 2px; background-color: #90caf9; margin-bottom: 24px;"></div>
                <div style="font-size: 28px; display: flex; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>by</span>
                        <span style="color: #90caf9; font-weight: 700;">${SITE_AUTHOR}</span>
                    </div>
                    <span style="flex:1;"></span>
                    <span style="color: #90caf9; font-weight: 700;">${SITE_TITLE}</span>
                </div>
            </div>
        </div>
`);

    const FontRegular = readFileSync(`${process.cwd()}/public/fonts/JetBrainsMono-Regular.ttf`);
    const FontBold = readFileSync(`${process.cwd()}/public/fonts/JetBrainsMono-Bold.ttf`);

    const SVG = await satori(MARKUP, {
        width: 1200,
        height: 630,
        fonts: [
            { name: "JetBrainsMono", data: FontRegular, weight: 400 },
            { name: "JetBrainsMono", data: FontBold, weight: 700 },
        ]
    })

    return sharp(Buffer.from(SVG)).png();
}
