import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeadingReveal from '@/components/HeadingReveal';

gsap.registerPlugin(ScrollTrigger);

const otherWorks = [
  { src: '/assets/mobile-1.jpg', alt: 'Finance mobile app UI concept' },
  { src: '/assets/mobile-3.jpg', alt: 'Music streaming mobile app UI concept' },
];

const OtherWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (worksRef.current) {
        const items = worksRef.current.querySelectorAll('.other-work-item');
        gsap.fromTo(
          items,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: worksRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="other-works"
      ref={sectionRef}
      className="relative w-full bg-black py-20 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16">
          <h2
            className="font-playfair uppercase text-white mb-2"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1.0,
            }}
          >
            <HeadingReveal text="Other Works" cursiveLastWord />
          </h2>
          <span className="font-inter text-xs uppercase tracking-[0.12em] text-muted">
            Mobile UI explorations, branding studies, and visual experiments
          </span>
        </div>

        <div ref={worksRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {otherWorks.map((work) => (
            <div
              key={work.src}
              className="other-work-item mobile-card opacity-0"
            >
              <div className="aspect-[2/3] h-full">
                <img src={work.src} alt={work.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherWorksSection;
