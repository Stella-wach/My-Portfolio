import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, GraduationCap, Award } from 'lucide-react';
import { photographerInfo } from '@/data/photographer.js';
import { SEOHead } from '@/components/seo/SEOHead.jsx';
import stellaPortrait from '@/assets/stella-portrait.jpeg';

export default function About() {
  return (
    <>
      <SEOHead title="About" description={`Learn about ${photographerInfo.name}, Full-Stack Software Developer based in Nairobi, Kenya.`} />
      
      <div className="min-h-screen relative z-10">
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 glow-cyan">
                  <img src={stellaPortrait} alt="Stella Wachira" className="w-full h-full object-cover object-top" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-2">About Me</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{photographerInfo.name}</h1>
                  <p className="text-xl text-muted-foreground">{photographerInfo.tagline}</p>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <a href={photographerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors" aria-label="GitHub"><Github className="size-5" /></a>
                  <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors" aria-label="LinkedIn"><Linkedin className="size-5" /></a>
                  <a href={`mailto:${photographerInfo.email}`} className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors" aria-label="Email"><Mail className="size-5" /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="p-6 bg-secondary/30 rounded-lg border border-border space-y-3">
              <MapPin className="size-6 text-primary" />
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-muted-foreground">{photographerInfo.location}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-6 bg-secondary/30 rounded-lg border border-border space-y-3">
              <GraduationCap className="size-6 text-accent" />
              <h3 className="font-semibold">Education</h3>
              <p className="text-sm text-muted-foreground">{photographerInfo.education}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="p-6 bg-secondary/30 rounded-lg border border-border space-y-3">
              <Award className="size-6 text-amber" />
              <h3 className="font-semibold">Certifications</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {photographerInfo.certifications.map((cert, i) => (<li key={i}>{cert}</li>))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Technical <span className="text-gradient-cyan">Skills</span></h2>
            <div className="flex flex-wrap gap-3">
              {photographerInfo.skills.map((skill) => (
                <motion.span key={skill} whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-sm font-medium bg-secondary/50 border border-border rounded-lg hover:border-primary/30 transition-colors">
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
        <div className="h-16" />
      </div>
    </>
  );
}
