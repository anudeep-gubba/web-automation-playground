import { useEffect, useState } from 'react'

export type ViewportClass = 'mobile' | 'tablet' | 'laptop' | 'desktop'

function classify(width: number): ViewportClass {
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  if (width < 1440) return 'laptop'
  return 'desktop'
}

export function useViewport() {
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { ...size, viewportClass: classify(size.width) }
}
