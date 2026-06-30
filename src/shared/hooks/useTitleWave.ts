import { useEffect } from 'react'

const WAVE_CHARACTER = '→'

export function useTitleWave(title: string, intervalMs = 8000, stepMs = 70) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let waveId: ReturnType<typeof setInterval> | null = null
    let sweepId: ReturnType<typeof setInterval> | null = null

    const sweep = () => {
      let pos = 0

      sweepId = setInterval(() => {
        if (pos > title.length) {
          if (sweepId !== null) clearInterval(sweepId)
          document.title = title
          return
        }

        document.title = title.slice(0, pos) + WAVE_CHARACTER + title.slice(pos)
        pos += 1
      }, stepMs)
    }

    const start = () => {
      waveId ??= setInterval(sweep, intervalMs)
    }

    const stop = () => {
      if (waveId !== null) {
        clearInterval(waveId)
        waveId = null
      }

      if (sweepId !== null) {
        clearInterval(sweepId)
        sweepId = null
      }

      document.title = title
    }

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      stop()
    }
  }, [title, intervalMs, stepMs])
}
