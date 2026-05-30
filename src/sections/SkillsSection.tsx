import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeadingReveal from '@/components/HeadingReveal';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Java',
    image: '/assets/skill-icons/java.webp',
  },
  {
    name: 'Python',
    image: '/assets/skill-icons/python.webp',
  },
  {
    name: 'HTML',
    image: '/assets/skill-icons/html.webp',
  },
  {
    name: 'CSS',
    image: '/assets/skill-icons/css.webp',
  },
  {
    name: 'JavaScript',
    image: '/assets/skill-icons/javascript.webp',
  },
  {
    name: 'React',
    image: '/assets/skill-icons/react.webp',
  },
  {
    name: 'Flask',
    image: '/assets/skill-icons/flask.webp',
  },
  {
    name: 'MySQL',
    image: '/assets/skill-icons/mysql.webp',
  },
  {
    name: 'Git',
    image: '/assets/skill-icons/git.webp',
  },
  {
    name: 'GitHub',
    image: '/assets/skill-icons/github.webp',
  },
  {
    name: 'VS Code',
    image: '/assets/skill-icons/vscode.webp',
  },
  {
    name: 'Vite',
    image: '/assets/skill-icons/vite.webp',
  },
];

const aiAgents = [
  {
    name: 'Claude',
    image: '/assets/ai-agents/claude.webp',
  },
  {
    name: 'Codex',
    image: '/assets/ai-agents/codex.webp',
  },
  {
    name: 'ChatGPT',
    image: '/assets/ai-agents/chatgpt.webp',
  },
  {
    name: 'Antigravity',
    image: '/assets/ai-agents/antigravity.webp',
  },
  {
    name: 'Kimi',
    image: '/assets/ai-agents/kimi.webp',
  },
  {
    name: 'Gemini',
    image: '/assets/ai-agents/gemini.webp',
  },
  {
    name: 'Cursor',
    image: '/assets/ai-agents/cursor.webp',
  },
  {
    name: 'GitHub Copilot',
    image: '/assets/ai-agents/github-copilot.webp',
  },
  {
    name: 'Perplexity',
    image: '/assets/ai-agents/perplexity.webp',
  },
  {
    name: 'Grok',
    image: '/assets/ai-agents/grok.webp',
  },
  {
    name: 'Windsurf',
    image: '/assets/ai-agents/windsurf.webp',
  },
  {
    name: 'Replit AI',
    image: '/assets/ai-agents/replit-ai.webp',
  },
];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let motionObserver: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      if (!contentRef.current || !marqueeRef.current || !agentsRef.current || !sectionRef.current) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const section = sectionRef.current;
      motionObserver = new IntersectionObserver(
        ([entry]) => {
          section.classList.toggle('skills-motion-paused', !entry.isIntersecting);
        },
        { rootMargin: '220px 0px' }
      );

      motionObserver.observe(section);

      gsap.set([contentRef.current, marqueeRef.current, agentsRef.current], {
        opacity: 0,
        y: reduceMotion ? 0 : 36,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      })
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.75,
        })
        .to(marqueeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.72,
        }, '-=0.38')
        .to(agentsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.72,
        }, '-=0.52');
    }, sectionRef);

    return () => {
      motionObserver?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative w-full overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #0E0A0B 0%, #1a0809 42%, #0E0A0B 100%)',
      }}
    >
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[#D94436]/10 blur-[86px]" />
      <div className="absolute bottom-16 right-0 h-80 w-[42vw] rounded-full bg-[#8B1A1A]/14 blur-[96px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="mb-12 opacity-0 md:mb-16">
          <span className="mb-3 block font-inter text-xs uppercase tracking-[0.18em] text-vermilion/80">
            Resume based tech stack
          </span>
          <h2
            className="mb-5 font-playfair uppercase text-white"
            style={{
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1.0,
            }}
          >
            <HeadingReveal text="Skills" cursiveLastWord />
          </h2>
          <p className="max-w-[620px] font-inter text-sm leading-[1.85] text-cream/78 md:text-base">
            Tools and technologies I use for frontend interfaces, Flask backend
            work, database handling, and project delivery.
          </p>
        </div>

        <div
          ref={marqueeRef}
          className="skill-marquee-shell opacity-0"
          aria-label="Known skills scrolling from right to left"
        >
            <div className="skill-marquee-track">
              {[...skills, ...skills].map((skill, index) => (
                <div className="skill-marquee-card" key={`${skill.name}-${index}`}>
                  <div className="skill-marquee-icon">
                    <img src={skill.image} alt="" width={28} height={28} loading="lazy" decoding="async" />
                  </div>
                  <span>{skill.name}</span>
                </div>
            ))}
          </div>
        </div>

        <div ref={agentsRef} className="mt-8 opacity-0">
          <div className="mb-5">
            <span className="mb-2 block font-inter text-xs uppercase tracking-[0.18em] text-vermilion/80">
              AI agents I explore
            </span>
            <h3 className="font-playfair text-3xl font-medium uppercase tracking-[0.04em] text-white md:text-5xl">
              AI Workflow
            </h3>
          </div>

          <div
            className="skill-marquee-shell"
            aria-label="AI agents scrolling from left to right"
          >
            <div className="skill-marquee-track skill-marquee-track-reverse">
              {[...aiAgents, ...aiAgents].map((agent, index) => (
                <div className="skill-marquee-card ai-agent-card" key={`${agent.name}-${index}`}>
                  <div className="skill-marquee-icon ai-agent-icon">
                    <img src={agent.image} alt="" width={28} height={28} loading="lazy" decoding="async" />
                  </div>
                  <span>{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
