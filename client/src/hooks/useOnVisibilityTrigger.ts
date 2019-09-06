import { useEffect } from 'react';

/**
 * a hook that fires the callback function when the ref element is 500px
 * below the current scroll position
 * @param {...React.RefObject} ref React.ref object
 * @param {callback} callback a function to be executed
 */

export function useOnVisibilityTrigger(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    let observer: IntersectionObserver;
    // capture ref.current because rec.current might
    // change before the cleanup function runs
    let currentRef: typeof ref.current | null = null;

    if (ref.current) {
      currentRef = ref.current;

      const options = {
        root: null,
        rootMargin: '500px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            console.log('triggering callback');
            callback();
          }
        });
      }, options);

      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, ref]);
}
