import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeadingReveal from '@/components/HeadingReveal';
import ParticlesCanvas from '@/components/ParticlesCanvas';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We define the goal, audience, style direction, and key pages for the project.',
  },
  {
    number: '02',
    title: 'Wireframe',
    description: 'I map the structure first so the layout feels clear before the visual design starts.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'The interface is shaped with typography, color, spacing, imagery, and interaction details.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'I turn the design into a responsive web experience with smooth motion and clean structure.',
  },
  {
    number: '05',
    title: 'Refine',
    description: 'We review the details, improve usability, and polish the final screens.',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'The final project is prepared for delivery with assets, links, and basic support notes.',
  },
];

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll('.process-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0E0A0B 0%, #4A0404 50%, #0E0A0B 100%)',
      }}
    >
      <ParticlesCanvas />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="font-playfair uppercase text-white"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1.0,
            }}
          >
            <HeadingReveal text="Process" cursiveLastWord />
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="process-card glass-card-dark p-6 md:p-8 process-card-hover group cursor-default"
            >
              <span
                className="block font-inter font-light mb-4 leading-none"
                style={{
                  fontSize: '48px',
                  color: 'rgba(138, 26, 26, 0.4)',
                }}
              >
                {step.number}
              </span>
              <h4 className="font-playfair text-lg font-medium text-white uppercase tracking-[0.08em] mb-3">
                {step.title}
              </h4>
              <p className="font-inter text-sm text-cream leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
