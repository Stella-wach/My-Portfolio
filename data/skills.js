// Categories and skills mirror the CV exactly (Frontend & Mobile,
// API & Backend, Databases, Tools, Payments, Additional) so the
// portfolio never claims something the CV doesn't back up.
export const skillCategories = [
  {
    category: 'Frontend & Mobile',
    skills: [
      { name: 'Flutter',      icon: '📱' },
      { name: 'Dart',         icon: '🎯' },
      { name: 'React',        icon: '⚛️' },
      { name: 'Next.js',      icon: '▲' },
      { name: 'TypeScript',   icon: '🔷' },
      { name: 'JavaScript',   icon: '⚡' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'HTML5',        icon: '🌐' },
      { name: 'CSS3',         icon: '💠' },
    ],
  },
  {
    category: 'API & Backend',
    skills: [
      { name: 'Node.js',    icon: '🟢' },
      { name: 'Express.js', icon: '🚀' },
      { name: 'REST APIs',  icon: '🔗' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'Firebase', icon: '🔥' },
      { name: 'MongoDB',  icon: '🍃' },
      { name: 'MySQL',    icon: '🗄️' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git',    icon: '🔀' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Docker', icon: '🐳' },
      { name: 'CI/CD',  icon: '🔄' },
    ],
  },
  {
    category: 'Payments',
    skills: [
      { name: 'M-PESA Daraja API', icon: '💳' },
    ],
  },
  {
    category: 'Additional',
    skills: [
      { name: 'Laravel', icon: '🔴' },
      { name: 'PHP',     icon: '🐘' },
    ],
  },
];

// Flat list for the floating particle background - it doesn't care
// about categories, just wants icons to draw.
export const skills = skillCategories.flatMap((c) => c.skills);
