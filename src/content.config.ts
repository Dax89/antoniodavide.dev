import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            published: z.coerce.date(),
            modified: z.coerce.date().optional(),
            image: image().optional(),
            featured: z.boolean().optional(),
            draft: z.boolean().optional(),
            tags: z.array(z.string()).default(["untagged"]),
        })
});

export const collections = { blog };
