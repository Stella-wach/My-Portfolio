import { useEffect, useRef } from 'react';
import { skills } from '@/data/skills.js';

const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 3.5;

export function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let balls = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

    const createBalls = () => {
      // Small, dense, quiet bubbles - a background detail, not a
      // foreground feature. Skill icons live in them, but stay subtle.
      const area = canvas.width * canvas.height;
      const targetCount = Math.floor(area / 20000);
      const list = Array.from({ length: Math.ceil(targetCount / skills.length) }, () => skills).flat();

      balls = list.slice(0, targetCount).map((skill) => ({
        skill,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 6, // 6-9px
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.06, // quiet - background, not foreground
      }));
    };

    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      balls.forEach((b) => {
        b.x += b.speedX; b.y += b.speedY;
        if (b.x < -15) b.x = canvas.width + 15;
        if (b.x > canvas.width + 15) b.x = -15;
        if (b.y < -15) b.y = canvas.height + 15;
        if (b.y > canvas.height + 15) b.y = -15;

        // Repel away from the cursor when it gets close, eased by distance
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          b.x += (dx / dist) * force;
          b.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(187, 70%, 65%, ${b.opacity})`;
        ctx.fill();

        ctx.font = `${Math.round(b.radius * 1.3)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = Math.min(0.5, b.opacity + 0.2);
        ctx.fillText(b.skill.icon, b.x, b.y);
        ctx.globalAlpha = 1;
      });
      animationId = requestAnimationFrame(animate);
    };

    resize(); createBalls(); animate();
    const onResize = () => { resize(); createBalls(); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" aria-hidden="true" />;
}



