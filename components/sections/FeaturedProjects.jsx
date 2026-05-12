import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Github, FolderOpen } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects.js';

export function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const projects = getFeaturedProjects();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Featured <span className="text-gradient-purple">Projects</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -8 }}
              className="group bg-secondary/30 rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen className="size-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-primary hover:text-primary/80 transition-colors"><Eye className="size-4" /></a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-foreground hover:text-primary transition-colors"><Github className="size-4" /></a>
                  )}
                </div>
                <h3 className="text-lg font-semibold">
                  <Link to={`/project/${project.slug}`} className="hover:text-primary transition-colors">{project.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>
                <p className="text-xs text-primary/80 font-medium">{project.technologies}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }} className="text-center mt-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-foreground hover:text-primary font-medium transition-colors">
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
