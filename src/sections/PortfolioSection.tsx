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
  },
  {
    src: '/assets/portfolio-2.jpg',
    alt: 'Zyra Fashion responsive e-commerce website',
    caption: 'Zyra Fashion',
  },
  {
    src: '/assets/portfolio-3.jpg',
    alt: 'React QR code generator interface',
    caption: 'React QR Code Generator',
  },
  {
    src: '/assets/portfolio-4.jpg',
    alt: 'Web development internship project interface',
    caption: 'Learn Flu Internship',
  },
];

const PortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;

      const items = gridRef.current.querySelectorAll('.portfolio-grid-item');

      items.forEach((item, index) => {
        const img = item.querySelector('.grid-image');

        if (img) {
          gsap.fromTo(
            img,
            { scale: 2.0 },
            {
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 30%',
                scrub: true,
              },
            }
          );
        }

        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full bg-black py-20 md:py-32 overflow-hidden"
    >
      <ParticlesCanvas />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12 md:mb-16">
          <h2
            className="font-playfair uppercase text-white mb-2"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1.0,
            }}
          >
            <HeadingReveal text="Selected Work" cursiveLastWord />
          </h2>
          <span className="font-inter text-xs uppercase tracking-[0.12em] text-muted">
            Data-driven apps, responsive websites, and internship project work
          </span>
        </div>

        <div ref={gridRef} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="portfolio-grid-item portfolio-card md:w-[60%] opacity-0">
              <div className="grid-image-wrapper relative h-[250px] md:h-[350px]">
                <img src={portfolioItems[0].src} alt={portfolioItems[0].alt} loading="lazy" decoding="async" className="grid-image w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="font-playfair text-xl text-white">{portfolioItems[0].caption}</span>
                </div>
              </div>
            </div>
            <div className="portfolio-grid-item portfolio-card md:w-[40%] opacity-0">
              <div className="grid-image-wrapper relative h-[250px] md:h-[350px]">
                <img src={portfolioItems[1].src} alt={portfolioItems[1].alt} loading="lazy" decoding="async" className="grid-image w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="font-playfair text-xl text-white">{portfolioItems[1].caption}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {portfolioItems.slice(2).map((item) => (
              <div key={item.caption} className="portfolio-grid-item portfolio-card md:w-1/2 opacity-0">
                <div className="grid-image-wrapper relative h-[200px] md:h-[280px]">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="grid-image w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="font-playfair text-xl text-white">{item.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
