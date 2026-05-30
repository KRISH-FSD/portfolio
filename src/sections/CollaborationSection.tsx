import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeadingReveal from '@/components/HeadingReveal';

gsap.registerPlugin(ScrollTrigger);

const CollaborationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.0,
            delay: 0.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-peach py-20 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <div ref={leftRef} className="flex-1 opacity-0">
            <h2
              className="font-playfair uppercase text-brown mb-6"
              style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                letterSpacing: '0.02em',
                lineHeight: 1.0,
              }}
            >
              <HeadingReveal text="Contact" />
            </h2>

            <p className="font-inter text-lg text-brown leading-[1.7] max-w-[520px] mb-6">
              Open to AI, data-oriented, internship, and web development opportunities.
              I enjoy building practical Flask, MySQL, and responsive frontend projects.
            </p>

            <a
              href="mailto:Krishsivakumar31@gmail.com"
              className="mb-8 inline-flex rounded-full bg-brown px-7 py-3 font-inter text-sm font-semibold uppercase tracking-[0.08em] text-cream transition hover:-translate-y-0.5 hover:bg-[#4A0404] hover:shadow-[0_16px_40px_rgba(58,26,16,0.18)]"
            >
              Email Me
            </a>

            <div className="flex flex-wrap gap-6">
              <div className="bg-cream rounded-xl p-4 shadow-[0_4px_20px_rgba(58,26,16,0.1)]">
                <img
                  src="/qr/linkedin.png"
                  alt="LinkedIn QR code"
                  loading="lazy"
                  decoding="async"
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                />
                <span className="block font-inter text-xs text-brown mt-2 tracking-[0.04em]">
                  LinkedIn
                </span>
              </div>

              <div className="bg-cream rounded-xl p-4 shadow-[0_4px_20px_rgba(58,26,16,0.1)]">
                <img
                  src="/qr/git.png"
                  alt="GitHub QR code"
                  loading="lazy"
                  decoding="async"
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                />
                <span className="block font-inter text-xs text-brown mt-2 tracking-[0.04em]">
                  GitHub
                </span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="flex-shrink-0 flex flex-col items-center opacity-0">
            <div className="relative">
              <div
                className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/30"
                style={{ width: 'clamp(340px, 36vw, 520px)', height: 'clamp(340px, 36vw, 520px)' }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-salmon/30"
                style={{ width: 'clamp(320px, 34vw, 500px)', height: 'clamp(320px, 34vw, 500px)' }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-salmon/20"
                style={{ width: 'clamp(380px, 40vw, 580px)', height: 'clamp(380px, 40vw, 580px)' }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-salmon/10"
                style={{ width: 'clamp(440px, 46vw, 660px)', height: 'clamp(440px, 46vw, 660px)' }}
              />

              <div
                className="relative rounded-full overflow-hidden border-4 border-salmon bg-peach shadow-[0_30px_90px_rgba(58,26,16,0.18)]"
                style={{ width: 'clamp(260px, 30vw, 400px)', height: 'clamp(260px, 30vw, 400px)' }}
              >
                <img
                  src="/assets/hero-portrait.png"
                  alt="Krishnakanth"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-bottom scale-110"
                />
              </div>
            </div>

            <span className="font-inter text-sm font-semibold uppercase tracking-[0.22em] text-brown mt-6 text-center">
              KRISHNAKANTH S
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
