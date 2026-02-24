import { readFileSync } from "fs";
import { getCollection } from "astro:content";
import { html } from "satori-html";
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
<div style="width: 100%; height: 100%; display: flex; background-color: #202020; color: #f4f1d6; position: relative">
    <div style="display: flex; position: absolute; left: 4%; top: 2%; width: 94%; height: 92%; border: 4px solid #f4f1d6; background-color: #757575"></div>
    <div style="position: absolute; left: 2%; top: 6%; width: 94%; height: 92%; border: 4px solid #f4f1d6; background-color: #202020; display: flex; flex-direction: column; padding: 35px">
        <div style="flex: 1; font-size: 64; font-weight: bold; color: #f4f1d6">
            ${title}
        </div>
        <div style="font-size: 32; display: flex">
            <div style="display: contents">by<b style="padding-left: 10; color: #90caf9">Antonio Davide</b></div>
            <span style="flex: 1"></span>
            <b style="padding-left: 10; color: #90caf9">antoniodavide.dev</b>
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
            { name: "JetBrainsMono Regular", data: FontRegular },
            { name: "JetBrainsMono Bold", data: FontBold, weight: 700 },
        ]
    })

    return sharp(Buffer.from(SVG)).png();
}
