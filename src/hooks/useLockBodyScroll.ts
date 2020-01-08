import { useEffect } from 'react'

const useLockBodyScroll = (lock = true) => {
  useEffect(() => {
    if (!lock) return

    document.body.style.setProperty('overflow', 'hidden')
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [lock])
}

export default useLockBodyScroll
