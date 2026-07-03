import { useEffect, useRef } from 'react'

import { LETTERS, scramble } from '@/shared/utils/scramble'

export function useScrambledDocumentTitle(title: string, duration = 1200) {
  const previousTitle = useRef<string | null>(null)

  useEffect(() => {
    // On first load keep the real title so crawlers never index a scrambled one.
    const isNewTitle =
      previousTitle.current !== null && previousTitle.current !== title

    previousTitle.current = title

    if (
      !isNewTitle ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
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
