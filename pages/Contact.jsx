import { SEOHead } from '@/components/seo/SEOHead.jsx';
import { ContactSection } from '@/components/sections/ContactSection.jsx';

export default function Contact() {
  return (
    <>
      <SEOHead title="Contact" description="Get in touch with Stella Wachira for project inquiries and collaborations." />
      <div className="min-h-screen relative z-10 pt-16">
        <ContactSection />
      </div>
    </>
  );
}
