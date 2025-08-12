import { useEffect } from "react";

export function useScrollToHash() {
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const el = document.querySelector(decodeURIComponent(window.location.hash));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Scroll on initial load
    const timer = setTimeout(scrollToHash, 100);

    // Listen for hash changes
    const handleHashChange = () => {
      scrollToHash();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}
