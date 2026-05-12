import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { ParticleBackground } from '@/components/ui/ParticleBackground.jsx';

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <Header />
      <main id="main-content" className="flex-1 pt-16 relative z-10" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
