import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

const Navigation: React.FC<NavigationProps> = ({ lenisRef }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState('#hero');

  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Skills', target: '#skills' },
    { label: 'Work', target: '#portfolio' },
    { label: 'Process', target: '#process' },
    { label: 'Contact', target: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['#hero', ...navLinks.map((link) => link.target)];
      let current = '#hero';

      sections.forEach((target) => {
        const el = document.querySelector(target);
        if (el && el.getBoundingClientRect().top <= 130) {
          current = target;
        }
      });

      if (current) {
        setActiveTarget(current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[80] w-full max-w-full px-5 pt-[max(1rem,env(safe-area-inset-top))] transition-all duration-500 md:px-8 ${
          scrolled
            ? 'pb-4 bg-[#0E0A0B]/90'
            : 'pb-6 bg-transparent'
        }`}
      >
        <div
          className="mx-auto flex w-full max-w-[1400px] items-center justify-between"
        >
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group font-playfair text-base font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-vermilion"
            aria-label="Go to hero section"
          >
            Krish
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`relative py-2 font-playfair text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
                  activeTarget === link.target
                    ? 'text-white'
                    : 'text-white/62 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-vermilion transition-all duration-300 ${
                    activeTarget === link.target
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="relative z-[90] flex h-11 w-11 shrink-0 items-center justify-center text-white transition hover:text-vermilion md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[70] flex max-w-full flex-col justify-end overflow-x-hidden bg-[#0E0A0B] px-4 pb-4 pt-24 transition-all duration-500 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="border-t border-[#D94436]/18 py-4">
          {[{ label: 'Home', target: '#hero' }, ...navLinks].map((link, i) => (
            <a
              key={link.label}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className={`flex items-center justify-between py-4 font-playfair text-3xl font-medium uppercase tracking-[0.08em] transition-all ${
                activeTarget === link.target
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 0.07}s` : '0s',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(18px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
              <span className="font-inter text-xs text-vermilion opacity-80">
                0{i + 1}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(Navigation);
