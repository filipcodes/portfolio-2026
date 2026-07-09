import {
  motion,
  type TargetAndTransition,
  useAnimationFrame,
  useIsPresent,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { useEffect } from 'react'

import { easeOutExpo } from '@/shared/constants/motion'

const AUTO_ADVANCE_S = 8
const SPEED_SPRING = { visualDuration: 0.45, bounce: 0 }

const drainExit: TargetAndTransition = {
  scaleX: [1, 1, 0],
  originX: [0, 1, 1],
  transition: {
    duration: 0.6,
    times: [0, 0.25, 1],
    ease: ['linear', easeOutExpo],
  },
}

const sprintDrainExit: TargetAndTransition = {
  scaleX: [null, 1, 1, 0],
  originX: [0, 0, 1, 1],
  transition: {
    duration: 1.1,
    times: [0, 0.45, 0.59, 1],
    ease: [easeOutExpo, 'linear', easeOutExpo],
  },
}

interface WorkProgressProps {
  paused: boolean
  onComplete: () => void
}

// Deliberately hand-rolled clock — see the animation policy in CLAUDE.md before replacing it with animate() controls
export function WorkProgress({ paused, onComplete }: WorkProgressProps) {
  const isPresent = useIsPresent()
  const progress = useMotionValue(0)
  const speed = useSpring(0, SPEED_SPRING)

  // useSpring reads its source argument only once; retargeting must go through set()
  useEffect(() => {
    speed.set(paused ? 0 : 1)
  }, [paused, speed])

  useAnimationFrame((_, delta) => {
    const value = progress.get()
    if (!isPresent || value >= 1) return

    const dt = Math.min(delta, 100) / 1000
    const next = Math.min(
      1,
      value + (Math.max(0, speed.get()) * dt) / AUTO_ADVANCE_S,
    )

    progress.set(next)
    if (next >= 1) onComplete()
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: progress }}
      variants={{
        exit: () => (progress.get() >= 1 ? drainExit : sprintDrainExit),
      }}
      exit='exit'
      className='bg-signal absolute inset-x-0 top-0 h-0.5 origin-left'
    />
  )
}
