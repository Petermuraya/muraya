import { useEffect } from 'react';

export default function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('in-view');
          } else {
            // optional: keep visible once seen
            // el.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    els.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
