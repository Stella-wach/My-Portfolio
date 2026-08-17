import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '@/data/skills.js';

export function SkillsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-gradient-cyan">Skills</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}>
              <h3 className="text-lg font-semibold text-muted-foreground mb-4 tracking-wide uppercase text-sm">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                {group.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: groupIndex * 0.1 + index * 0.04 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-default">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-foreground text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
