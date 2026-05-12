import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { photographerInfo } from '@/data/photographer.js';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-lg font-bold">
          <span className="text-primary">{'</>'}</span>
          <span className="text-foreground">{photographerInfo.name}</span>
        </div>
        <p className="text-muted-foreground text-sm">Software Developer & Creative Thinker</p>
        <div className="flex items-center justify-center gap-5">
          <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="size-5" /></a>
          <a href={photographerInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub"><Github className="size-5" /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter"><Twitter className="size-5" /></a>
          <a href={`mailto:${photographerInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email"><Mail className="size-5" /></a>
        </div>
        
      </div>
    </footer>
  );
}
