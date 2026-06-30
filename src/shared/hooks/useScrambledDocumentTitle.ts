import { useEffect } from 'react'

import { LETTERS, scramble } from '@/shared/utils/scramble'

export function useScrambledDocumentTitle(title: string, duration = 1200) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.title = title
      return
    }

    const tickMs = 30
    const totalTicks = Math.max(1, Math.round(duration / tickMs))
    let tick = 0

    const id = setInterval(() => {
      tick += 1

      if (tick >= totalTicks) {
        clearInterval(id)
        document.title = title
      } else {
        const settled = Math.floor((tick / totalTicks) * title.length)
        document.title = scramble(title, settled, LETTERS)
      }
    }, tickMs)

    return () => {
      clearInterval(id)
    }
  }, [title, duration])
}
