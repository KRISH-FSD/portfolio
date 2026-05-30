import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TiltCardOptions {
  maxRotationX?: number;
  maxRotationY?: number;
  perspective?: number;
  glowColor?: string;
  transitionDuration?: number;
}

export function useTiltCard<T extends HTMLElement>(options: TiltCardOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const {
      maxRotationX = 15,
      maxRotationY = 15,
      glowColor = 'rgba(217, 68, 54, 0.12)',
      transitionDuration = 0.4,
    } = options;

    const container = card.parentElement;
    if (container) {
      container.style.perspective = `${options.perspective || 1000}px`;
    }

    // Create shine element
    const shine = document.createElement('div');
    shine.className = 'shine';
    card.appendChild(shine);

    const handleMouseMove = (e: MouseEvent) => {
      if (e.currentTarget !== card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const normalizedX = (x - 0.5) * 2;
      const normalizedY = (y - 0.5) * 2;

      const rotateX = maxRotationX * normalizedY;
      const rotateY = -(maxRotationY * normalizedX);

      const glowX = 50 + normalizedX * 50;
      const glowY = 50 + normalizedY * 50;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: transitionDuration,
        ease: 'power2.out',
      });

      shine.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, rgba(255,255,255,0) 70%)`;
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: transitionDuration,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (shine.parentNode) {
        shine.parentNode.removeChild(shine);
      }
    };
  }, []);

  return ref;
}
