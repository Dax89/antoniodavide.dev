import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
    return function(tree, { data }) {
        const textonpage = toString(tree);
        const readingtime = getReadingTime(textonpage);
        data.astro.frontmatter.minutesRead = readingtime.text;
    };
}
