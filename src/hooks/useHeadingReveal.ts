import { useEffect } from 'react';

export function useHeadingReveal() {
  useEffect(() => {
    const observedHeadings = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    const observeHeadings = () => {
      const headings = document.querySelectorAll('[data-scroll="heading-reveal"]');
      headings.forEach((heading) => {
        if (!observedHeadings.has(heading)) {
          observedHeadings.add(heading);
          observer.observe(heading);
        }
      });
    };

    observeHeadings();

    const mutationObserver = new MutationObserver(observeHeadings);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observedHeadings.forEach((heading) => observer.unobserve(heading));
      observer.disconnect();
    };
  }, []);
}
