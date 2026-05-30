import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';
import { useTiltCard } from '@/hooks/useTiltCard';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useTiltCard<HTMLDivElement>({
    maxRotationX: 10,
    maxRotationY: 10,
    glowColor: 'rgba(217, 68, 54, 0.15)',
  });
  const rightCardRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const revealItems = gsap.utils.toArray<HTMLElement>('.about-content-reveal');

      gsap.set([leftCardRef.current, rightCardRef.current], {
        opacity: 0,
        y: reduceMotion ? 0 : 54,
      });

      gsap.set(imageWrapRef.current, {
        clipPath: reduceMotion ? 'inset(0% 0% 0% 0% round 18px)' : 'inset(12% 10% 12% 10% round 18px)',
        scale: reduceMotion ? 1 : 0.96,
      });

      gsap.set(portraitRef.current, {
        scale: reduceMotion ? 1 : 1.08,
        y: reduceMotion ? 0 : 24,
      });

      gsap.set(revealItems, {
        opacity: 0,
        y: reduceMotion ? 0 : 24,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to([leftCardRef.current, rightCardRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
        })
        .to(imageWrapRef.current, {
          clipPath: 'inset(0% 0% 0% 0% round 18px)',
          scale: 1,
          duration: 0.95,
        }, '-=0.62')
        .to(portraitRef.current, {
          scale: 1,
          y: 0,
          duration: 0.95,
        }, '<')
        .to(revealItems, {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.08,
        }, '-=0.5');

      if (!reduceMotion) {
        gsap.to(portraitRef.current, {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black pt-20 pb-10 md:pt-28 md:pb-12"
    >
      <div className="absolute left-1/2 top-24 h-64 w-[72vw] -translate-x-1/2 rounded-full bg-[#8B1A1A]/10 blur-[90px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left card - Profile */}
          <div className="tilt-card-container">
            <div
              ref={leftCardRef}
              className="tilt-card glass-card p-6 md:p-8 relative opacity-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,68,54,0.18),transparent_32%)] pointer-events-none" />
              <span className="block font-playfair text-lg uppercase tracking-[0.12em] text-muted mb-4">
                About{' '}
                <span className="font-cursive text-[1.7em] normal-case tracking-normal text-vermilion">
                  Me
                </span>
              </span>
              <div
                ref={imageWrapRef}
                className="relative overflow-hidden rounded-[18px] bg-gradient-to-b from-[#2a0707] via-[#160809] to-[#080405]"
              >
                <div
                  className="absolute inset-x-8 bottom-0 h-2/3 rounded-full blur-3xl"
                  style={{ background: 'rgba(139, 26, 26, 0.5)' }}
                />
                <img
                  ref={portraitRef}
                  src="/assets/hero-portrait.png"
                  alt="Krishnakanth"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full max-w-[440px] mx-auto aspect-square object-contain object-bottom"
                  style={{ filter: 'drop-shadow(0 24px 55px rgba(0,0,0,0.55))' }}
                />
              </div>
            </div>
          </div>

          {/* Right card - Bio */}
          <div
            ref={rightCardRef}
            className="glass-card p-6 md:p-8 opacity-0 flex flex-col justify-center overflow-hidden relative"
          >
            <div className="absolute right-[-80px] top-[-80px] h-48 w-48 rounded-full bg-[#D94436]/10 blur-[60px]" />
            <div ref={contentRef} className="relative z-10">
            <h3
              className="about-content-reveal font-playfair font-medium text-white uppercase mb-6"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
              }}
            >
              AI & Data-Focused BCA Student
            </h3>
            <div className="about-content-reveal space-y-5">
              <p className="font-inter text-[15px] leading-[1.85] text-cream text-justify">
                I'm a <span className="text-vermilion">BCA student and tech enthusiast</span> focused on Python, Flask backend development, MySQL, and data-driven web applications.
              </p>
              <p className="font-inter text-[15px] leading-[1.85] text-cream text-justify">
                I build <span className="text-white">analytics-focused</span> projects that combine responsive frontends, REST APIs, database workflows, and visual dashboards, including <span className="text-vermilion">AGRO AI</span>, <span className="text-vermilion">Zyra Fashion</span>, and a <span className="text-vermilion">React QR Code Generator</span>.
              </p>
            </div>
            <a
              href="/KRISHNAKANTH_RESUME.pdf"
              download
              className="about-content-reveal mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-[#D94436]/40 bg-[#4A0404]/60 px-7 py-3 font-inter text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:border-[#F2E8E8]/60 hover:bg-[#8B1A1A]/60 hover:shadow-[0_14px_40px_rgba(217,68,54,0.18)] focus:outline-none focus:ring-2 focus:ring-[#F2E8E8]/40"
            >
              Resume
              <Download size={18} strokeWidth={2} aria-hidden="true" />
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
