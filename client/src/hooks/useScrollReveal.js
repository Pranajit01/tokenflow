/**
 * useScrollReveal.js — IntersectionObserver hook for fade-in-on-scroll
 * 
 * Adds 'revealed' class to elements with 'scroll-reveal' class
 * when they enter the viewport. No third-party scroll library.
 */

import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold }
    );

    // Observe all children with .scroll-reveal class
    const container = ref.current;
    if (container) {
      const elements = container.querySelectorAll('.scroll-reveal');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export default useScrollReveal;
