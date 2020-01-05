import { useEffect } from 'react'

/**
 * a hook that fires the callback function when the ref element is 400px
 * below the current scroll position
 */

const options = {
  root: null,
  rootMargin: '400px',
  threshold: 1.0,
}

const useOnVisibilityTrigger = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    if (!ref.current) return

    // ref.current might change before the cleaup function runs
    // so we need to capture the reference
    const currentRef = ref.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) callback()
      })
    }, options)

    observer.observe(currentRef)

    return () => observer.unobserve(currentRef)
  }, [callback, ref])
}

export default useOnVisibilityTrigger
