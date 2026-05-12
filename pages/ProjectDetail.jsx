import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Code, ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator.jsx';
import { SEOHead } from '@/components/seo/SEOHead.jsx';
import { getProjectBySlug } from '@/data/projects.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/404" replace />;

  return (
    <>
      <SEOHead title={project.title} description={project.description} image={project.coverImage} type="article" />
      <div className="min-h-screen">
        {project.coverImage && (
          <motion.div className="relative w-full h-[60vh] overflow-hidden bg-muted"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </motion.div>
        )}

        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="size-4" /> Back to Projects
          </Link>

          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">{project.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-light">
                <div className="flex items-center gap-2"><Calendar className="size-4" /><span>{project.year}</span></div>
                <span>•</span><span className="capitalize">{project.category}</span>
                {project.location && (<><span>•</span><div className="flex items-center gap-2"><MapPin className="size-4" /><span>{project.location}</span></div></>)}
              </div>
            </div>

            <Separator />
            <p className="text-lg md:text-xl font-light leading-relaxed">{project.description}</p>

            {project.technologies && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                  <Code className="size-4" /><span>Technologies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(',').map(t => (
                    <span key={t.trim()} className="px-3 py-1 text-sm bg-secondary rounded-full border border-border">{t.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap gap-4 pt-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-light hover:bg-accent transition-colors">
                    <Github className="size-4" /> View Source
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-light hover:bg-primary/90 transition-colors">
                    <ExternalLink className="size-4" /> Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </>
  );
}
