interface Social {
    name: string;
    href: string;
    title: string;
    icon: string;
};

export const SITE_TITLE = "antoniodavide.dev";
export const SITE_AUTHOR = "Antonio Davide";
export const SITE_DESCRIPTION = "The Coding Chronicles";
export const MAX_RECENTS = 5;

export const SOCIALS: Social[] = [
    {
        name: "GitHub",
        href: "https://github.com/Dax89",
        title: `${SITE_TITLE} on GitHub`,
        icon: "github",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/antoniodavidetrogu",
        title: `${SITE_TITLE} on LinkedIn`,
        icon: "linkedin",
    },
    {
        name: "X",
        href: "https://x.com/dax89",
        title: `${SITE_TITLE} on X`,
        icon: "twitter",
    },
    {
        name: "RSS",
        href: "/rss.xml",
        title: `Subscribe to ${SITE_TITLE}`,
        icon: "rss",
    },
];
