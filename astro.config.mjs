// @ts-check

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
    site: "https://antoniodavide.dev",
    adapter: cloudflare({ imageService: "compile" }),
    integrations: [mdx(), sitemap(), icon(), pagefind()],

    vite: {
        plugins: [tailwindcss()],
        ssr: { external: ["fs"] }
    },

    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            theme: "dracula",
        }
    }
});
