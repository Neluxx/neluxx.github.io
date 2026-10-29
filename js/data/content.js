/**
 * All portfolio content lives here.
 * Edit this file to update texts — no need to touch the commands.
 */

export const user = {
    name: 'neluxx',
    host: 'portfolio',
};

export const welcome = {
    subtitle: 'Ubuntu 24.04 LTS',
    message: 'Welcome to my interactive portfolio',
};

export const about = {
    title: 'Let me introduce myself!',
    paragraphs: [
        'Hey, I’m Fabian. I’m a full-stack developer from Germany. I started out in media design, became curious about what happens behind the pixels, and eventually made my way into software development through a degree in computer science.',
        'At ORCA Services, I build and maintain custom web applications for Swiss clients in public transport, insurance and the justice sector. My work spans the whole lifecycle, from the initial idea to long-term maintenance. We also maintain a handful of open source packages that came out of the projects we work on.',
        'In my spare time, I contribute to open source when I come across something worth improving, and work on projects of my own.',
        'Away from the keyboard, I enjoy spending time outdoors, whether it’s hiking or working in the garden.',
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
            description: 'Building and maintaining custom web applications for Swiss clients in public transport, insurance and the justice sector, from the initial idea to long-term maintenance',
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
        { label: 'LinkedIn', text: 'linkedin.com/in/arndt-fabian', url: 'https://www.linkedin.com/in/arndt-fabian/' },
        { label: 'Email',    text: 'neluxx@proton.me',             url: 'mailto:neluxx@proton.me' },
    ],
};

export const projects = {
    title: 'Some things I’ve built',
    list: [
        {
            name: 'air2mqtt',
            description: 'Reads air quality sensor data and publishes it to MQTT',
            text: 'github.com/neluxx/air2mqtt',
            url: 'https://github.com/Neluxx/air2mqtt',
        },
        {
            name: 'neluxx.github.io',
            description: 'My portfolio as an interactive terminal in the browser, built with plain HTML, CSS and JavaScript. You’re using it right now',
            text: 'github.com/neluxx/neluxx.github.io',
            url: 'https://github.com/Neluxx/neluxx.github.io',
        },
        {
            name: 'Minecraft Datapacks',
            description: 'A collection of Minecraft datapacks focused on custom world generation',
            text: 'github.com/Neluxx?tab=repositories&q=datapack',
            url: 'https://github.com/Neluxx?tab=repositories&q=datapack',
        },
    ],
};