/**
 * Shape of the portfolio content in content.ts.
 * TypeScript reports a missing or misspelled field right in the editor.
 */

export interface User {
    name: string;
    host: string;
}

export interface Welcome {
    subtitle: string;
    message: string;
}

export interface About {
    title: string;
    paragraphs: string[];
}

export interface Education {
    title: string;
    degree: string;
    university: string;
    thesis: string;
    engagement: string[];
}

export interface Job {
    title: string;
    company: string;
    description: string;
}

export interface Experience {
    title: string;
    jobs: Job[];
}

export interface SkillGroup {
    label: string;
    items: string[];
}

export interface Skills {
    title: string;
    groups: SkillGroup[];
}

/** A link shown with a readable text instead of the raw URL. */
export interface Link {
    text: string;
    url: string;
}

export interface SocialLink extends Link {
    label: string;
}

export interface Socials {
    title: string;
    links: SocialLink[];
}

export interface Project extends Link {
    name: string;
    description: string;
}

export interface Projects {
    title: string;
    list: Project[];
}
