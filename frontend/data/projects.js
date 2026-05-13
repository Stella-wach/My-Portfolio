export const projects = [
  {
    id: '1',
    title: 'Event App System',
    category: 'fullstack',
    year: '2025',
    slug: 'event-app-system',
    coverImage: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A complete event management platform with user authentication, MPESA payment integration via Safaricom STK push, and RESTful API endpoints for creating, updating, and managing events. Integrated MongoDB for storing user profiles, event details, and registration data.',
    technologies: 'React.js, Node.js, Express.js, MongoDB, M-PESA API',
    location: 'Nairobi, Kenya',
    githubUrl: 'https://github.com/Stella-wach/Event-Project.git',
     liveUrl: 'https://quickeventsfrontend.vercel.app/',
    images: [
      { id: '1-1', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1080&q=80', alt: 'Event management dashboard', aspectRatio: 'landscape' },
    ]
  },
  {
    id: '2',
    title: 'Weather App',
    category: 'frontend',
    year: '2025',
    slug: 'weather-app',
    coverImage: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1080&q=80',
    description: 'A mobile-first responsive weather application integrating OpenWeatherMap API for real-time weather data. Features asynchronous data fetching, current conditions display, forecasts, and weather alerts with elegant Tailwind CSS styling.',
    technologies: 'HTML5, Tailwind CSS, Vanilla JavaScript, OpenWeatherMap API',
    location: 'Nairobi, Kenya',
    githubUrl: 'https://github.com/Stella-wach/Weather-App.git',
     liveUrl: 'https://weather-app-eight-psi-93.vercel.app/',
    images: [
      { id: '2-1', src: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1080&q=80', alt: 'Weather dashboard', aspectRatio: 'landscape' },
    ]
  },
  {
    id: '3',
    title: 'Hotel Booking System',
    category: 'fullstack',
    year: '2025',
    slug: 'hotel-booking-system',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80',
    description: 'A comprehensive hotel reservation platform built with Laravel and PHP. Features database architecture for room inventory management, booking workflows with availability checking, admin dashboard for hotel staff, and MPESA STK push payment processing.',
    technologies: 'Laravel, PHP, MySQL, M-PESA API',
    location: 'Nairobi, Kenya',
    githubUrl: 'https://github.com/Stella-wach/Hotel-Booking-System.git',
    images: [
      { id: '3-1', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1080&q=80', alt: 'Hotel booking interface', aspectRatio: 'landscape' },
    ]
  },
  {
    id: '4',
    title: 'Globe App',
    category: 'mobile',
    year: '2025',
    slug: 'globe-app',
    coverImage: 'https://images.unsplash.com/photo-1612103147485-8c8de055942b?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A cross-platform e-commerce mobile application built with Flutter and Dart. Features dual dashboards for admin and user roles, M-PESA payment integration for seamless mobile payments, Firebase backend for real-time data synchronization, and Node.js server for payment processing logic.',
    technologies: 'Flutter, Dart, Firebase, Node.js, M-PESA API',
    location: 'Nairobi, Kenya',
    githubUrl: 'https://github.com/Stella-wach/Go-Cart_Flutter.git',
    liveUrl: 'https://globe-app-8da95.web.app/',
    images: [
      { id: '4-1', src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1080&q=80', alt: 'Globe App e-commerce storefront', aspectRatio: 'landscape' },
    ]
  }
];

export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = () => {
  return projects.slice(0, 4);
};

export const getAdjacentProjects = (currentSlug) => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
