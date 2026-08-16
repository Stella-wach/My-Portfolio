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
      // One floating bubble per skill, repeated as needed to fill larger
      // screens without them feeling sparse.
      const area = canvas.width * canvas.height;
      const repeats = Math.max(1, Math.round(area / (900 * 900)));
      const list = Array.from({ length: repeats }, () => skills).flat();

      balls = list.map((skill) => ({
        skill,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 8 + 18, // 18-26px
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.25 + 0.15,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((b) => {
        b.x += b.speedX; b.y += b.speedY;
        if (b.x < -30) b.x = canvas.width + 30;
        if (b.x > canvas.width + 30) b.x = -30;
        if (b.y < -30) b.y = canvas.height + 30;
        if (b.y > canvas.height + 30) b.y = -30;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(187, 80%, 65%, ${b.opacity})`;
        ctx.fill();
        ctx.strokeStyle = `hsla(187, 80%, 75%, ${b.opacity + 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = `${Math.round(b.radius)}px sans-serif`;
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



