/**
 * All portfolio content lives here.
 * Edit this file to update texts — no need to touch the commands.
 */

export const user = {
    name: 'neluxx',
    host: 'portfolio',
};

export const welcome = {
    subtitle: 'Ubuntu 24.04 LTS — plain HTML / CSS / JavaScript',
    message: 'Welcome to my interactive portfolio',
};

export const about = {
    title: 'Let me introduce myself!',
    paragraphs: [
        'Hey, my name is Fabian. I’m a full-stack software developer from Germany with a passion for building things on the web, contributing to open source, and experimenting with new technologies. I originally came from a media design background, which sparked my interest in development and eventually led me into computer science.',
        'When I’m not working on software, I’m usually creating Minecraft datapacks or tinkering with side projects.',
        'I love clean code, open-source, and a good cup of coffee ☕',
    ],
};

export const education = {
    title: 'How I got here',
    degree: 'B.Sc. Media Informatics',
    university: 'Furtwangen University · Sep 2017 – Mar 2021',
    thesis: 'Development of a web-based preprocessing application for machine learning workflows',
    engagement: [
        'Semester Representative',
        'Student Council Assistant',
        'Student Representative of the Media Informatics Study Commission',
        'Participant HFU Excellence Coaching Program',
        'Tutor for Mathematics and Physics',
    ],
};

export const experience = {
    title: 'Where I’ve worked so far',
    jobs: [
        {
            title: 'Software developer',
            company: 'ORCA Services AG · Aug 2021 – Present',
            description: 'Designing and building web applications for clients across various industries',
        },
        {
            title: 'Junior web developer',
            company: 'Wackenhut GmbH & Co. KG · May 2021 – Jul 2021',
            description: 'Built full-stack web applications with PHP and React',
        },
        {
            title: 'Research assistant',
            company: 'Fraunhofer IOSB · Aug 2020 – Apr 2021',
            description: 'Helped build a web-based annotation tool with Python and Django',
        },
        {
            title: 'Internship in web development',
            company: 'Agency teufels · Sep 2018 – Mar 2019',
            description: 'Built dynamic websites with the TYPO3 CMS',
        },
    ],
};

export const skills = {
    title: 'Here’s what I work with',
    groups: [
        { label: 'Languages',  items: ['PHP', 'Python', 'Java', 'JavaScript'] },
        { label: 'Frameworks', items: ['Laravel', 'CakePHP', 'Symfony', 'Django'] },
        { label: 'Tools',      items: ['Docker', 'Git', 'MySQL', 'Apache', 'Nginx'] },
    ],
};

export const socials = {
    title: 'Get in touch with me!',
    links: [
        { label: 'GitHub',   text: 'github.com/neluxx',            url: 'https://github.com/neluxx' },
        { label: 'LinkedIn', text: 'linkedin.com/in/arndt-fabian', url: 'https://linkedin.com/in/arndt-fabian' },
    ],
};

export const projects = {
    title: 'Some things I’ve built',
    list: [
        {
            name: 'CLI Portfolio',
            description: 'My personal portfolio, built as an interactive browser-based terminal with plain HTML, CSS and JavaScript',
            text: 'github.com/neluxx/cli-portfolio',
            url: 'https://github.com/neluxx/cli-portfolio',
        },
        {
            name: 'Enviro Hub',
            description: 'Laravel-based API for storing, processing, and alerting based on environmental sensor data from distributed nodes',
            text: 'github.com/neluxx/enviro-hub',
            url: 'https://github.com/neluxx/enviro-hub',
        },
        {
            name: 'Enviro Node',
            description: 'A Raspberry Pi sensor node built with Python',
            text: 'github.com/neluxx/enviro-node',
            url: 'https://github.com/neluxx/enviro-node',
        },
        {
            name: 'Minecraft Datapacks',
            description: 'A collection of Minecraft datapacks focused on custom world generation',
            text: 'github.com/Neluxx?tab=repositories&q=minecraft',
            url: 'https://github.com/Neluxx?tab=repositories&q=minecraft',
        },
    ],
};
