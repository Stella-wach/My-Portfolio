import { motion } from 'framer-motion';
import { Eye, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer.js';
import { SEOHead } from '@/components/seo/SEOHead.jsx';
import { SkillsGrid } from '@/components/sections/SkillsGrid.jsx';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects.jsx';
import { ContactSection } from '@/components/sections/ContactSection.jsx';
import robotGif from '@/assets/robot.gif';

const socialLinks = [
  { icon: Linkedin, href: photographerInfo.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Github,   href: photographerInfo.socialLinks.github,   label: 'GitHub' },
  { icon: Mail,     href: `mailto:${photographerInfo.email}`,    label: 'Email' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
};

export default function Home() {
  return (
    <>
      <SEOHead />
      <div className="relative z-10">
        <section className="min-h-screen flex items-center px-6 lg:px-12 pt-20 pb-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-center">

              {/* Left — Text */}
              <div className="space-y-6 max-w-xl">
                <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                  Welcome to my world
                </motion.p>
                <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hi! I'm <span className="text-gradient-cyan">Stella</span>
                </motion.h1>
                <motion.h2 custom={2} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-2xl md:text-3xl font-light text-muted-foreground">
                  Full-Stack Software Developer
                </motion.h2>
                <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  I like turning ideas into real applications, handling everything from backend architecture and APIs to polished front-end experiences and payment integrations like M-PESA.
                </motion.p>
                <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex flex-wrap items-center gap-6">
                  <Link to="/portfolio"
                    className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
                    <Eye className="size-4" /> View My Work
                  </Link>
                  <a href="/Stella_Wachira_Resume.pdf" download="Stella_Wachira_Resume.pdf"
                    className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
                    <Download className="size-4" /> Download CV
                  </a>
                </motion.div>
                <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
                  className="flex items-center gap-4 pt-2">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label={s.label}>
                      <s.icon className="size-5" />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right — Robot */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex justify-center lg:justify-end">
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border-glow-cyan scale-110" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30">
                    <motion.img src={robotGif} alt="3D Robot" className="w-full h-full object-contain" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                  </div>
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-sm">
                    {'</>'}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SkillsGrid />
        <FeaturedProjects />
        <ContactSection />
      </div>
    </>
  );
}
