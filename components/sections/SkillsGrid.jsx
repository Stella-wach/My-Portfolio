import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { skillCategories } from '@/data/skills.js';

const AUTO_ADVANCE_MS = 4000;
const STACK_DEPTH = 3; // how many "peeking" cards sit behind the active one

export function SkillsGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = skillCategories.length;

  const goTo = useCallback((index) => {
    setActiveIndex(((index % total) + total) % total);
  }, [total]);

  // Auto-advance every 4s, unless paused (hover/focus) or the visitor
  // has motion turned down at the OS level.
  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isInView) return undefined;
    const id = setInterval(() => goTo(activeIndex + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [activeIndex, isPaused, prefersReducedMotion, isInView, goTo]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-gradient-cyan">Skills</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            {skillCategories[activeIndex].category}
          </p>
        </motion.div>

        {/* Card stack */}
        <div
          className="relative h-[340px] sm:h-[300px] mx-auto max-w-xl select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {skillCategories.map((group, index) => {
            // Position relative to the active card: 0 = front, 1 = one behind, 2 = two behind...
            const offset = (index - activeIndex + total) % total;
            const isActive = offset === 0;
            const isVisible = offset < STACK_DEPTH;
            if (!isVisible) return null;

            return (
              <motion.div
                key={group.category}
                className="absolute inset-0 rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-6 md:p-8 flex flex-col shadow-xl"
                style={{ zIndex: STACK_DEPTH - offset }}
                initial={false}
                animate={{
                  scale: 1 - offset * 0.06,
                  y: offset * 16,
                  opacity: isActive ? 1 : 0.55 - offset * 0.15,
                  filter: isActive ? 'blur(0px)' : 'blur(1px)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={group.category}
                      className="flex flex-col h-full"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-5">
                        {group.category}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 overflow-y-auto pr-1">
                        {group.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: skillIndex * 0.04 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors cursor-default"
                          >
                            <span className="text-xl">{skill.icon}</span>
                            <span className="text-xs font-medium text-foreground text-center">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators - clickable, glow green when active */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {skillCategories.map((group, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={group.category}
                type="button"
                aria-label={`Show ${group.category} skills`}
                aria-current={isActive}
                onClick={() => goTo(index)}
                className="relative flex items-center justify-center p-1.5 cursor-pointer group"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-3 bg-green shadow-[0_0_10px_3px_hsl(142_70%_45%/0.6)]'
                      : 'w-2 h-2 bg-muted-foreground/40 group-hover:bg-muted-foreground/70'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
