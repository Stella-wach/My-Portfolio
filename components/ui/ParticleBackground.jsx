import { useEffect, useRef } from 'react';
import { skills } from '@/data/skills.js';

export function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let balls = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

    const createBalls = () => {
      // Small, dense bubbles like the original dots - just with skill
      // icons inside instead of being plain.
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
        opacity: Math.random() * 0.3 + 0.15,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((b) => {
        b.x += b.speedX; b.y += b.speedY;
        if (b.x < -15) b.x = canvas.width + 15;
        if (b.x > canvas.width + 15) b.x = -15;
        if (b.y < -15) b.y = canvas.height + 15;
        if (b.y > canvas.height + 15) b.y = -15;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(187, 80%, 65%, ${b.opacity})`;
        ctx.fill();

        ctx.font = `${Math.round(b.radius * 1.3)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = Math.min(1, b.opacity + 0.55);
        ctx.fillText(b.skill.icon, b.x, b.y);
        ctx.globalAlpha = 1;
      });
      animationId = requestAnimationFrame(animate);
    };

    resize(); createBalls(); animate();
    const onResize = () => { resize(); createBalls(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}



