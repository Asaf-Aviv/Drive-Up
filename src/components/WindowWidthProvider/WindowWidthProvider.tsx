import React, { createContext, useState, useEffect } from 'react'

export const WindowWidthContext = createContext(0)

const WindowWidthProvider = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <WindowWidthContext.Provider value={width}>
      {children}
    </WindowWidthContext.Provider>
  )
}

export default WindowWidthProvider
