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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupCursor = () => {};

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;

      const items = gridRef.current.querySelectorAll('.portfolio-grid-item');
      const cursor = cursorRef.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 640px)').matches;

      if (progressRef.current && sectionRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          }
        );
      }

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
        const card = item as HTMLElement;
        const img = item.querySelector('.grid-image');
        const media = item.querySelector('.portfolio-card-media');
        const panel = item.querySelector('.portfolio-card-panel');
        const panelItems = item.querySelectorAll('.portfolio-card-index, .portfolio-card-panel h3, .portfolio-card-panel p, .portfolio-card-footer span');

        if (img) {
          gsap.fromTo(
            img,
            { scale: reduceMotion ? 1 : 1.34, yPercent: reduceMotion ? 0 : -9 },
            {
              scale: reduceMotion ? 1 : 0.98,
              yPercent: reduceMotion ? 0 : 8,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            }
          );
        }

        if (media && !reduceMotion) {
          gsap.fromTo(
            media,
            { rotateZ: index % 2 === 0 ? -1.8 : 1.8, scale: 1.04 },
            {
              rotateZ: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                end: 'top 28%',
                scrub: 0.9,
              },
            }
          );
        }

        if (panel && !reduceMotion && !isMobile) {
          gsap.fromTo(
            panel,
            { yPercent: 14 },
            {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        if (panelItems.length) {
          gsap.fromTo(
            panelItems,
            { opacity: 0, y: reduceMotion ? 0 : 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.07,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 72%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: reduceMotion ? 0 : 96,
            rotateX: reduceMotion ? 0 : 12,
            rotateZ: reduceMotion ? 0 : index % 2 === 0 ? -1.4 : 1.4,
            clipPath: 'inset(14% 10% 14% 10% round 24px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 1.05,
            delay: index * 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );

        if (!reduceMotion && !isMobile) {
          gsap.fromTo(
            item,
            { scale: 0.94, filter: 'brightness(0.78) saturate(0.9)' },
            {
              scale: 1,
              filter: 'brightness(1) saturate(1)',
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 95%',
                end: 'top 42%',
                scrub: 0.85,
              },
            }
          );

          const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
          const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
          const lift = gsap.quickTo(card, 'z', { duration: 0.35, ease: 'power3.out' });

          const handleMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            rotateX(y * -7);
            rotateY(x * 7);
            lift(34);
          };

          const handleLeave = () => {
            rotateX(0);
            rotateY(0);
            lift(0);
          };

          card.addEventListener('mousemove', handleMove);
          card.addEventListener('mouseleave', handleLeave);

          const previousCleanup = cleanupCursor;
          cleanupCursor = () => {
            previousCleanup();
            card.removeEventListener('mousemove', handleMove);
            card.removeEventListener('mouseleave', handleLeave);
          };
        }
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
      <div className="portfolio-scroll-progress" aria-hidden="true">
        <div ref={progressRef} />
      </div>
      <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true">
        View
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="portfolio-showcase-header mb-12 md:mb-16">
          <h2
            className="portfolio-desktop-title font-playfair uppercase text-white"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1.0,
            }}
          >
            <HeadingReveal text="Selected Work" cursiveLastWord />
          </h2>
          <h2 className="portfolio-mobile-title font-playfair uppercase text-white">
            Selected Work
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
