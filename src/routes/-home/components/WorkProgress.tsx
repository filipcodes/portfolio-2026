import {
  animate,
  type AnimationPlaybackControls,
  motion,
  type TargetAndTransition,
  useIsPresent,
  useMotionValue,
  useSpring,
} from 'motion/react'
import { useEffect, useRef } from 'react'

import { easeOutExpo } from '@/shared/constants/motion'

const AUTO_ADVANCE_S = 8

const FOLLOW_SPRING = { visualDuration: 0.5, bounce: 0 }

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
  const barScaleX = useSpring(progress, FOLLOW_SPRING)
  const timer = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => {
    const controls = animate(progress, [0, 1], {
      duration: AUTO_ADVANCE_S,
      ease: 'linear',
      onComplete,
    })

    timer.current = controls
    return () => {
      controls.stop()
    }
  }, [progress, onComplete])

  useEffect(() => {
    const controls = timer.current
    if (!controls || !isPresent) return
    if (paused) {
      controls.pause()
    } else {
      controls.play()
    }
  }, [paused, isPresent])

  useEffect(() => {
    if (!isPresent) timer.current?.stop()
  }, [isPresent])

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: barScaleX }}
      variants={{
        exit: () => (progress.get() >= 1 ? drainExit : sprintDrainExit),
      }}
      exit='exit'
      className='bg-signal absolute inset-x-0 top-0 h-0.5 origin-left'
    />
  )
}
