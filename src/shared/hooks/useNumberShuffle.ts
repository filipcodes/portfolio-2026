import { useEffect,useState } from 'react'

export function useNumberShuffle(targetValue: string, duration = 900) {
  const [display, setDisplay] = useState(targetValue)

  useEffect(
    function shuffleDigits() {
      const tickMs = 30
      const totalTicks = Math.max(1, Math.round(duration / tickMs))

      let tick = 0

      const id = setInterval(() => {
        tick += 1

        if (tick > totalTicks) {
          clearInterval(id)
          setDisplay(targetValue)
        } else {
          setDisplay(
            Array.from(targetValue, () => Math.floor(Math.random() * 10)).join(
              '',
            ),
          )
        }
      }, tickMs)

      return () => {
        clearInterval(id)
      }
    },
    [targetValue, duration],
  )

  return display
}
