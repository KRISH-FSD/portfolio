import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  scale?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 50,
      x = 0,
      duration = 1.0,
      delay = 0,
      stagger = 0,
      start = 'top 85%',
      scale,
    } = options;

    const fromVars: gsap.TweenVars = { opacity: 0, y, x };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
      toVars.scale = 1;
    }

    if (stagger > 0) {
      const children = el.children;
      gsap.fromTo(children, fromVars, { ...toVars, stagger });
    } else {
      gsap.fromTo(el, fromVars, toVars);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, []);

  return ref;
}
