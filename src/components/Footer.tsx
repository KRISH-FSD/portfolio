import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const links = [
    {
      href: 'https://github.com/KRISH-FSD',
      label: 'GitHub',
      icon: Github,
    },
    {
      href: 'https://www.linkedin.com/in/krishnakanthsivakumar',
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'mailto:Krishsivakumar31@gmail.com',
      label: 'Email',
      icon: Mail,
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#080506] pt-12 pb-10 md:pt-14 md:pb-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D94436]/55 to-transparent" />
      <div className="absolute left-1/2 top-[-120px] h-72 w-[72vw] -translate-x-1/2 rounded-full bg-[#8B1A1A]/20 blur-[100px]" />
      <div className="absolute bottom-0 right-[-10%] h-52 w-52 rounded-full bg-[#D94436]/10 blur-[80px]" />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-8 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-8 rounded-[28px] bg-white/[0.035] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:flex-row md:items-end md:justify-between md:p-8">
          <div>
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-vermilion">
              Let's connect
            </p>
            <h2
              className="mt-3 font-playfair font-medium uppercase text-cream"
              style={{
                fontSize: 'clamp(34px, 6vw, 84px)',
                lineHeight: 0.95,
                letterSpacing: '0.01em',
              }}
            >
              Krishnakanth
            </h2>
            <p className="mt-4 max-w-[520px] font-inter text-sm leading-[1.7] text-cream/58">
              Open to freelance work, internships, and creative web projects with clean interfaces and smooth interactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group inline-flex items-center gap-2 rounded-full bg-[#8B1A1A]/35 px-5 py-3 font-inter text-xs font-semibold uppercase tracking-[0.1em] text-cream transition hover:-translate-y-1 hover:bg-[#D94436]/80 hover:text-white hover:shadow-[0_18px_46px_rgba(217,68,54,0.2)]"
                aria-label={label}
              >
                <Icon size={16} strokeWidth={2} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-1 md:flex-row md:items-center md:justify-between">
          <p className="font-inter text-xs uppercase tracking-[0.14em] text-cream/42">
            UI/UX & Web Designer
          </p>
          <p className="font-inter text-xs text-cream/55 md:text-right">
            &copy; 2026 Krishnakanth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
