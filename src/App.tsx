import React, { lazy } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useHeadingReveal } from '@/hooks/useHeadingReveal';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LazySection from '@/components/LazySection';
import HeroSection from '@/sections/HeroSection';

const AboutSection = lazy(() => import('@/sections/AboutSection'));
const SkillsSection = lazy(() => import('@/sections/SkillsSection'));
const PortfolioSection = lazy(() => import('@/sections/PortfolioSection'));
const OtherWorksSection = lazy(() => import('@/sections/OtherWorksSection'));
const ProcessSection = lazy(() => import('@/sections/ProcessSection'));
const CollaborationSection = lazy(() => import('@/sections/CollaborationSection'));

const App: React.FC = () => {
  const lenisRef = useLenis();
  useHeadingReveal();

  return (
    <div className="relative">
      <Navigation lenisRef={lenisRef} />
      <main>
        <HeroSection />
        <LazySection minHeight="640px">
          <AboutSection />
        </LazySection>
        <LazySection minHeight="620px">
          <SkillsSection />
        </LazySection>
        <LazySection minHeight="720px">
          <PortfolioSection />
        </LazySection>
        <LazySection minHeight="520px">
          <OtherWorksSection />
        </LazySection>
        <LazySection minHeight="620px">
          <ProcessSection />
        </LazySection>
        <LazySection minHeight="520px">
          <CollaborationSection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
};

export default App;
