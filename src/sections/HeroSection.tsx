import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HeroRibbonCanvas = lazy(() => import('@/components/HeroRibbonCanvas'));

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const leftStackRef = useRef<HTMLDivElement>(null);
  const rightHeadlineRef = useRef<HTMLDivElement>(null);
  const designerOverlayRef = useRef<HTMLDivElement>(null);
  const [showRibbon, setShowRibbon] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.set([watermarkRef.current, rightHeadlineRef.current, designerOverlayRef.current], {
        opacity: 0,
      });

      if (leftStackRef.current) {
        tl.set(leftStackRef.current.querySelectorAll('.stack-item'), {
          opacity: 0,
          y: 34,
          rotateX: -16,
        });
      }

      tl.set(portraitRef.current, {
        opacity: 0,
        xPercent: -50,
        y: reduceMotion ? 0 : 60,
        scale: reduceMotion ? 1 : 0.94,
      });

      tl.fromTo(loaderTextRef.current, {
        opacity: 0,
        y: 12,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.45,
      })
        .fromTo(loaderBarRef.current, {
          scaleX: 0,
          transformOrigin: 'left center',
        }, {
          scaleX: 1,
          duration: reduceMotion ? 0.2 : 0.9,
          ease: 'power2.inOut',
        }, '<0.05')
        .to(loaderTextRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.28,
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: reduceMotion ? 0.25 : 0.75,
          ease: 'power4.inOut',
        }, '<')
        .fromTo(glowRef.current, {
          opacity: 0,
          scale: 0.9,
        }, {
          opacity: 1,
          scale: 1,
          duration: 1.0,
        }, '-=0.2')
        .fromTo(watermarkRef.current, {
          opacity: 0,
          scale: reduceMotion ? 1 : 1.08,
          filter: 'blur(10px)',
        }, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.0,
        }, '<0.05')
        .to(portraitRef.current, {
          opacity: 1,
          xPercent: -50,
          y: 0,
          scale: 1,
          duration: 1.0,
        }, '-=0.55')
        .fromTo([rightHeadlineRef.current, designerOverlayRef.current], {
          opacity: 0,
          y: reduceMotion ? 0 : 34,
          scale: reduceMotion ? 1 : 0.97,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.04,
        }, '-=0.55');

      if (leftStackRef.current) {
        tl.to(leftStackRef.current.querySelectorAll('.stack-item'), {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.12,
        }, '-=0.45');
      }

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowRibbon(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0E0A0B]"
    >
      {/* Hero loader */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-[60] flex items-center justify-center bg-[#0E0A0B]"
      >
        <div className="w-[min(360px,70vw)]">
          <div
            ref={loaderTextRef}
            className="font-playfair text-sm uppercase tracking-[0.22em] text-white/80 text-center mb-4"
          >
            Krishnakanth
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div ref={loaderBarRef} className="h-full w-full bg-[#F2E8E8]" />
          </div>
        </div>
      </div>

      {/* 3D Ribbon Canvas */}
      {showRibbon && (
        <Suspense fallback={null}>
          <HeroRibbonCanvas />
        </Suspense>
      )}

      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 65% 50%, rgba(139,26,26,0.3) 0%, transparent 50%)',
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="relative flex items-center justify-center min-h-[100dvh]">

          {/* Background watermark "Portfolio" */}
          <div
            ref={watermarkRef}
            className="absolute left-1/2 top-[35%] w-screen -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-0 select-none"
          >
            <span
              className="font-playfair uppercase text-[rgba(139,26,26,0.15)] leading-none whitespace-nowrap block"
              style={{
                fontSize: 'clamp(100px, 19vw, 360px)',
                transform: 'scaleX(0.98)',
                transformOrigin: 'center',
              }}
            >
              Portfolio
            </span>
          </div>

          {/* Portrait image */}
          <img
            ref={portraitRef}
            src="/assets/hero-portrait.png"
            alt="Krishnakanth"
            loading="eager"
            decoding="async"
            className="absolute bottom-0 z-[5] max-h-[86vh] md:max-h-[92vh] w-auto object-contain opacity-0"
            style={{
              left: 'calc(50% + 15px)',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 88%, rgba(0,0,0,0.72) 96%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 0%, #000 88%, rgba(0,0,0,0.72) 96%, transparent 100%)',
            }}
          />

          {/* Outlined DESIGNER overlay above portrait */}
          <div
            ref={designerOverlayRef}
            className="absolute left-[57%] top-[75%] w-screen -translate-x-1/2 -translate-y-1/2 z-[12] text-center opacity-0 pointer-events-none"
          >
            <span className="block font-playfair text-sm uppercase tracking-[0.12em] text-transparent mb-2">
              KRISH
            </span>
            <span
              className="block font-playfair font-normal uppercase leading-[0.9]"
              style={{
                fontSize: 'clamp(66px, 12.8vw, 225px)',
                letterSpacing: '0.01em',
                color: 'transparent',
                WebkitTextStroke: '1.5px #F2E8E8',
              }}
              aria-hidden="true"
            >
              DEVELOPER
            </span>
          </div>

          {/* Left stack - UI/UX / WEB */}
          <div
            ref={leftStackRef}
            className="absolute top-[68%] -translate-y-1/2 z-[20] flex flex-col gap-0"
            style={{ left: 'calc(50% - 45vw)', marginLeft: '80px' }}
          >
            <span
              className="stack-item absolute font-playfair text-sm font-medium uppercase tracking-[0.14em] text-white/76 opacity-0 translate-y-[30px] whitespace-nowrap"
              style={{
                left: 'calc(100% + 18px)',
                top: 'clamp(10px, 0.8vw, 16px)',
              }}
            >
              HEY, I'M{' '}
              <span className="font-cursive text-[1.8em] normal-case tracking-normal text-vermilion">
                Krish
              </span>
            </span>
            <span
              className="stack-item font-playfair font-semibold uppercase text-white leading-[1.05] opacity-0 translate-y-[30px] whitespace-nowrap"
              style={{ fontSize: 'clamp(28px, 3vw, 46px)' }}
            >
              UI/UX
            </span>
            <span
              className="stack-item font-playfair font-semibold uppercase text-white leading-[1.05] opacity-0 translate-y-[30px] whitespace-nowrap"
              style={{ fontSize: 'clamp(34px, 3.8vw, 58px)' }}
            >
              WEB
            </span>
          </div>

          {/* Center headline - KRISH + DESIGNER */}
          <div
            ref={rightHeadlineRef}
            className="absolute left-[57%] top-[75%] w-screen -translate-x-1/2 -translate-y-1/2 z-[4] text-center opacity-0"
          >
            <span className="block font-playfair text-sm uppercase tracking-[0.12em] text-muted mb-2">
              KRISH
            </span>
            <span
              className="block font-playfair font-normal uppercase leading-[0.9]"
              style={{
                fontSize: 'clamp(66px, 12.8vw, 225px)',
                letterSpacing: '0.01em',
                color: '#FFFFFF',
              }}
            >
              DEVELOPER
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
