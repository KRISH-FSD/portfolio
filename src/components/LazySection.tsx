import React, { Suspense, useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  minHeight = '320px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={ref}
      className="lazy-section-shell"
      style={{ minHeight: shouldRender ? undefined : minHeight }}
    >
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
};

export default LazySection;
