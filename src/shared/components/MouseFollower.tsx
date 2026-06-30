import { useEffect, useRef } from 'react'

export function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return

    let targetX = 0
    let targetY = 0

    let currentX = 0
    let currentY = 0

    let frame = 0

    let visible = false

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!visible) {
        visible = true
        currentX = targetX
        currentY = targetY
        el.style.opacity = '1'
      }
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18

      el.style.transform = `translate(${String(currentX)}px, ${String(currentY)}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className='pointer-events-none fixed top-0 left-0 z-60 size-6 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-300'
    />
  )
}
