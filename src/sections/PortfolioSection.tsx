import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeadingReveal from '@/components/HeadingReveal';
import ParticlesCanvas from '@/components/ParticlesCanvas';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    src: '/assets/portfolio-1.png',
    alt: 'AGRO AI crop monitoring and yield analytics dashboard',
    caption: 'AGRO AI - Crop Analytics',
    tag: 'Full-stack analytics',
    tech: 'Flask / MySQL / Chart.js',
    summary: 'Crop monitoring dashboard with yield insights, CRUD tracking, and visual analytics.',
  },
  {
    src: '/assets/portfolio-2.jpg',
    alt: 'Zyra Fashion responsive e-commerce website',
    caption: 'Zyra Fashion',
    tag: 'Responsive commerce',
    tech: 'HTML / CSS / JavaScript',
    summary: 'Modern fashion storefront with responsive layouts and a working hamburger menu.',
  },
  {
    src: '/assets/portfolio-3.jpg',
    alt: 'React QR code generator interface',
    caption: 'React QR Code Generator',
    tag: 'React utility',
    tech: 'React / Vite / ES6+',
    summary: 'Real-time QR rendering for text and URLs with a focused generator experience.',
  },
  {
    src: '/assets/portfolio-4.jpg',
    alt: 'Web development internship project interface',
    caption: 'Learn Flu Internship',
    tag: 'Internship work',
    tech: 'Frontend / Backend basics',
    summary: 'Live-project contribution covering frontend implementation and basic integration.',
  },
];

const PortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupCursor = () => {};

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;

      const items = gridRef.current.querySelectorAll('.portfolio-grid-item');
      const cursor = cursorRef.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (cursor && sectionRef.current && !reduceMotion) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.86 });

        const moveX = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3.out' });
        const moveY = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3.out' });
        const show = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' });
        const hide = () => gsap.to(cursor, { opacity: 0, scale: 0.86, duration: 0.22, ease: 'power2.out' });
        const move = (event: MouseEvent) => {
          moveX(event.clientX);
          moveY(event.clientY);
        };

        const section = sectionRef.current;
        section.addEventListener('mousemove', move);
        section.addEventListener('mouseenter', show);
        section.addEventListener('mouseleave', hide);

        cleanupCursor = () => {
          section.removeEventListener('mousemove', move);
          section.removeEventListener('mouseenter', show);
          section.removeEventListener('mouseleave', hide);
        };
      }

      items.forEach((item, index) => {
        const img = item.querySelector('.grid-image');

        if (img) {
          gsap.fromTo(
            img,
            { scale: reduceMotion ? 1 : 1.18, yPercent: reduceMotion ? 0 : -4 },
            {
              scale: 1,
              yPercent: reduceMotion ? 0 : 5,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }

        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: reduceMotion ? 0 : 80,
            rotateX: reduceMotion ? 0 : 8,
            clipPath: 'inset(10% 8% 10% 8% round 24px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 0.9,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      cleanupCursor();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="portfolio-showcase relative w-full bg-black py-20 md:py-32 overflow-hidden"
    >
      <ParticlesCanvas />
      <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true">
        View
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="portfolio-showcase-header mb-12 md:mb-16">
          <h2
            className="font-playfair uppercase text-white"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1.0,
            }}
          >
            <HeadingReveal text="Selected Work" cursiveLastWord />
          </h2>
          <p className="portfolio-showcase-copy">
            Data-driven apps, responsive websites, and internship project work shaped into practical, polished experiences.
          </p>
        </div>

        <div ref={gridRef} className="portfolio-showcase-grid">
          {portfolioItems.map((item, index) => (
            <article
              key={item.caption}
              className={`portfolio-grid-item portfolio-card portfolio-feature-card opacity-0 ${index === 0 ? 'portfolio-feature-card-large' : ''}`}
            >
              <div className="portfolio-card-media grid-image-wrapper">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="grid-image" />
              </div>
              <div className="portfolio-card-panel">
                <div>
                  <span className="portfolio-card-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.caption}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="portfolio-card-footer">
                  <span>{item.tag}</span>
                  <span>{item.tech}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
