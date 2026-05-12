import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead.jsx";

const NotFound = () => {
  return (
    <>
      <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." />
      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6">
        <motion.div className="max-w-2xl w-full text-center space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="text-[120px] md:text-[180px] font-extralight tracking-wider leading-none text-foreground/10">404</h1>
          </motion.div>
          <div className="space-y-4 -mt-8">
            <h2 className="text-3xl md:text-5xl font-light tracking-wide">Page Not Found</h2>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Button asChild size="lg" className="px-8 py-6 text-base font-light tracking-wide group">
            <Link to="/"><ArrowLeft className="mr-2 size-5 transition-transform group-hover:-translate-x-1" /> Return to Home</Link>
          </Button>
        </motion.div>
      </main>
    </>
  );
};

export default NotFound;
