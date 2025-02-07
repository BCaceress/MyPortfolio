import Image from 'next/image';

export default function Skills() {
    const skills = [
        { name: 'JavaScript', logo: '/images/icon-javascript.svg' },
        { name: 'TypeScript', logo: '/images/icon-typescript.svg' },
        { name: 'React', logo: '/images/icon-react.svg' },
        { name: 'Next.js', logo: '/images/icon-nextjs.svg' },
        { name: 'Vue.js', logo: '/images/icon-vuejs.svg' },
        { name: 'Nuxt.js', logo: '/images/icon-nuxt.svg' },
        { name: 'Laravel', logo: '/images/icon-laravel.svg' },
        { name: 'React Native', logo: '/images/icon-react.svg' },
        { name: 'Bootstrap', logo: '/images/icon-bootstrap.svg' },
        { name: 'Tailwind', logo: '/images/icon-tailwind.svg' },
        { name: 'Sass', logo: '/images/icon-sass.svg' },
        { name: 'Figma', logo: '/images/icon-figma.svg' },
        { name: 'Node.js', logo: '/images/icon-nodejs.svg' },
        { name: 'Git', logo: '/images/icon-git.svg' },
        { name: 'PostgreSQL', logo: '/images/icon-postgresql.svg' },
        { name: 'PostgreSQL', logo: '/images/icon-postgresql.svg' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
            <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mb-5">{"> "} Skills</h2>
            <p className="text-center mb-12 text-lg text-gray-700 dark:text-gray-300">
                The skills, tools, and technologies I am really good at:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center space-y-4 transform transition duration-500 hover:scale-105"
                    >
                        <Image
                            className="skill-logo"
                            src={skill.logo}
                            alt={skill.name}
                            width={60}
                            height={60}
                            style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'contain' }}
                        />
                        <p className="text-center text-lg font-medium">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
