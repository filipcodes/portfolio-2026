import {
  animate,
  type AnimationPlaybackControls,
  motion,
  type TargetAndTransition,
  useIsPresent,
  useMotionValue,
} from 'motion/react'
import { useEffect, useRef } from 'react'

import { easeOutExpo } from '@/shared/constants/motion'

const AUTO_ADVANCE_S = 8
const SPEED_RAMP_S = 0.45

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

export function WorkProgress({ paused, onComplete }: WorkProgressProps) {
  const isPresent = useIsPresent()
  const progress = useMotionValue(0)
  const timer = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => {
    const controls = animate(progress, [0, 1], {
      duration: AUTO_ADVANCE_S,
      ease: 'linear',
      onComplete,
    })

    controls.speed = 0
    timer.current = controls
    return () => {
      controls.stop()
    }
  }, [progress, onComplete])

  useEffect(() => {
    const controls = timer.current
    if (!controls || !isPresent) return
    const ramp = animate(
      controls,
      { speed: paused ? 0 : 1 },
      { duration: SPEED_RAMP_S, ease: 'easeOut' },
    )
    return () => {
      ramp.stop()
    }
  }, [paused, isPresent])

  useEffect(() => {
    if (!isPresent) timer.current?.stop()
  }, [isPresent])

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
