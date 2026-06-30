import { useEffect, useState } from 'react'

import { DIGITS, scramble } from '@/shared/utils/scramble'

export function useNumberShuffle(
  targetValue: string,
  enabled = true,
  duration = 900,
) {
  const [display, setDisplay] = useState(targetValue)

  useEffect(
    function shuffleDigits() {
      if (!enabled) return

      const tickMs = 30
      const totalTicks = Math.max(1, Math.round(duration / tickMs))

      let tick = 0

      const id = setInterval(() => {
        tick += 1

        if (tick > totalTicks) {
          clearInterval(id)
          setDisplay(targetValue)
        } else {
          setDisplay(scramble(targetValue, 0, DIGITS))
        }
      }, tickMs)

      return () => {
        clearInterval(id)
      }
    },
    [targetValue, duration, enabled],
  )

  return display
}
