import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Java',
    image: '/assets/skill-icons/java.webp',
    accent: '#E76F00',
  },
  {
    name: 'Python',
    image: '/assets/skill-icons/python.webp',
    accent: '#3776AB',
  },
  {
    name: 'HTML',
    image: '/assets/skill-icons/html.webp',
    accent: '#E34F26',
  },
  {
    name: 'CSS',
    image: '/assets/skill-icons/css.webp',
    accent: '#1572B6',
  },
  {
    name: 'JavaScript',
    image: '/assets/skill-icons/javascript.webp',
    accent: '#F7DF1E',
  },
  {
    name: 'React',
    image: '/assets/skill-icons/react.webp',
    accent: '#61DAFB',
  },
  {
    name: 'Flask',
    image: '/assets/skill-icons/flask.webp',
    accent: '#F8FAFC',
  },
  {
    name: 'MySQL',
    image: '/assets/skill-icons/mysql.webp',
    accent: '#00758F',
  },
  {
    name: 'Git',
    image: '/assets/skill-icons/git.webp',
    accent: '#F05032',
  },
  {
    name: 'GitHub',
    image: '/assets/skill-icons/github.webp',
    accent: '#F8FAFC',
  },
  {
    name: 'VS Code',
    image: '/assets/skill-icons/vscode.webp',
    accent: '#007ACC',
  },
  {
    name: 'Vite',
    image: '/assets/skill-icons/vite.webp',
    accent: '#A855F7',
  },
];

const aiAgents: Array<{
  name: string;
  image: string;
  accent: string;
}> = [
  {
    name: 'Claude',
    image: '/assets/ai-agent-icons/claude.webp',
    accent: '#D97757',
  },
  {
    name: 'Codex',
    image: '/assets/ai-agent-icons/codex.webp',
    accent: '#22C55E',
  },
  {
    name: 'ChatGPT',
    image: '/assets/ai-agent-icons/chatgpt.webp',
    accent: '#10A37F',
  },
  {
    name: 'Antigravity',
    image: '/assets/ai-agent-icons/antigravity.webp',
    accent: '#8B5CF6',
  },
  {
    name: 'Kimi',
    image: '/assets/ai-agents/kimi.webp',
    accent: '#38BDF8',
  },
  {
    name: 'Gemini',
    image: '/assets/ai-agent-icons/gemini.webp',
    accent: '#A78BFA',
  },
  {
    name: 'Cursor',
    image: '/assets/ai-agent-icons/cursor.webp',
    accent: '#F8FAFC',
  },
  {
    name: 'GitHub Copilot',
    image: '/assets/ai-agent-icons/github-copilot.webp',
    accent: '#7C3AED',
  },
  {
    name: 'Perplexity',
    image: '/assets/ai-agent-icons/perplexity.webp',
    accent: '#20B8CD',
  },
  {
    name: 'Grok',
    image: '/assets/ai-agent-icons/grok.webp',
    accent: '#F59E0B',
  },
  {
    name: 'Windsurf',
    image: '/assets/ai-agent-icons/windsurf.webp',
    accent: '#06B6D4',
  },
  {
    name: 'Replit AI',
    image: '/assets/ai-agent-icons/replit-ai.webp',
    accent: '#F97316',
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
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="skills-header mb-12 opacity-0 md:mb-16">
          <div>
            <span className="skills-eyebrow">
              Resume based tech stack
            </span>
            <h2
              className="font-playfair uppercase text-white"
              style={{
                fontSize: 'clamp(56px, 9vw, 132px)',
                letterSpacing: '0.02em',
                lineHeight: 0.9,
              }}
            >
              Skills
            </h2>
          </div>
          <div className="skills-copy">
            <p>
              Tools and technologies I use for frontend interfaces, Flask backend
              work, database handling, and project delivery.
            </p>
            <div className="skills-pills" aria-label="Skill categories">
              <span>Frontend</span>
              <span>Backend</span>
              <span>AI Workflow</span>
            </div>
          </div>
        </div>

        <div ref={marqueeRef} className="skill-lane opacity-0">
          <div className="skill-lane-heading">
            <span className="skill-lane-index">01</span>
            <h3>Tech Skills</h3>
          </div>
          <div
            className="skill-marquee-shell"
            aria-label="Known skills scrolling from right to left"
          >
            <div className="skill-marquee-track">
              {[...skills, ...skills].map((skill, index) => (
                <div
                  className="skill-marquee-card"
                  key={`${skill.name}-${index}`}
                  style={{ '--agent-accent': skill.accent } as React.CSSProperties}
                >
                  <div className="skill-marquee-icon">
                    <img src={skill.image} alt="" width={28} height={28} loading="lazy" decoding="async" />
                  </div>
                  <span>{skill.name}</span>
                </div>
            ))}
            </div>
          </div>
        </div>

        <div ref={agentsRef} className="skill-lane mt-8 opacity-0">
          <div className="skill-lane-heading">
            <span className="skill-lane-index">02</span>
            <h3>AI Workflow</h3>
          </div>
          <div
            className="skill-marquee-shell"
            aria-label="AI agents scrolling from left to right"
          >
            <div className="skill-marquee-track skill-marquee-track-reverse">
              {[...aiAgents, ...aiAgents].map((agent, index) => (
                <div
                  className="skill-marquee-card ai-agent-card"
                  key={`${agent.name}-${index}`}
                  style={{ '--agent-accent': agent.accent } as React.CSSProperties}
                >
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
