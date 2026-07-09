import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  useAnimationFrame,
  useIsPresent,
  useMotionValue,
} from 'motion/react'
import { useRef } from 'react'

import { MediaImage } from '@/MediaImage'
import type { Work } from '@/routes/-home/constants/works'
import { UnstyledExternalLink } from '@/shared/components/ExternalLink'
import { easeOutExpo, fadeUp } from '@/shared/constants/motion'

export type ColumnState = 'expanded' | 'collapsed'

// Collapsed columns share 30% of the row; the expanded one takes the rest
const BASIS_CLASS_BY_STATE: Record<ColumnState, string> = {
  expanded: 'basis-[calc(100%-min(var(--cols)-1,1)*30%)]',
  collapsed: 'basis-[calc(30%/max(var(--cols)-1,1))]',
}

const easeCarousel = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

const AUTO_ADVANCE_S = 8
const SPEED_SMOOTHING = 6

// Handoff: the full bar drains toward the divider; the origin flips while scaleX sits at 1, so it is invisible
const drainExit: TargetAndTransition = {
  scaleX: [1, 1, 0],
  originX: [0, 1, 1],
  transition: {
    duration: 0.6,
    times: [0, 0.25, 1],
    ease: ['linear', easeOutExpo],
  },
}

// Manual steps sprint the remaining distance home before the same drain
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

function WorkProgress({ paused, onComplete }: WorkProgressProps) {
  const isPresent = useIsPresent()
  const scaleX = useMotionValue(0)
  const progress = useRef(0)
  const speed = useRef(0)

  useAnimationFrame((_, delta) => {
    if (!isPresent || progress.current >= 1) return

    const dt = Math.min(delta, 100) / 1000
    const targetSpeed = paused ? 0 : 1
    speed.current +=
      (targetSpeed - speed.current) * Math.min(1, SPEED_SMOOTHING * dt)
    progress.current = Math.min(
      1,
      progress.current + (speed.current * dt) / AUTO_ADVANCE_S,
    )

    scaleX.set(progress.current)
    if (progress.current >= 1) onComplete()
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      variants={{
        exit: () => (progress.current >= 1 ? drainExit : sprintDrainExit),
      }}
      exit='exit'
      className='bg-signal absolute inset-x-0 top-0 h-0.5 origin-left'
    />
  )
}

interface WorkColumnProps {
  work: Work
  state: ColumnState
  timerPaused: boolean
  onAutoAdvance?: () => void
}

export function WorkColumn({
  work,
  state,
  timerPaused,
  onAutoAdvance,
}: WorkColumnProps) {
  const isExpanded = state === 'expanded'

  return (
    <motion.li
      variants={fadeUp}
      data-state={state}
      className={`group/card border-border relative min-w-0 shrink-0 grow-0 overflow-hidden border-l transition-[flex-basis] duration-1100 first:border-l-0 motion-reduce:transition-none ${easeCarousel} ${BASIS_CLASS_BY_STATE[state]}`}
    >
      <AnimatePresence>
        {onAutoAdvance && (
          <WorkProgress
            key='progress'
            paused={timerPaused}
            onComplete={onAutoAdvance}
          />
        )}
      </AnimatePresence>

      {/* The mask lives on this wrapper, not the li, so the progress bar above escapes the edge fade */}
      <div className='h-full mask-r-from-[calc(100%-1.5rem)] p-6'>
        {/* Content is laid out once at expanded width; the column is a window sliding over it */}
        <div className='flex h-full w-[calc(100cqw-min(var(--cols)-1,1)*30cqw-3rem)] flex-col'>
          <p className='text-signal mb-4 font-mono text-xs tracking-widest uppercase'>
            {work.tag}
          </p>
          <h3 className='font-display mb-8 text-5xl tracking-tight'>
            <UnstyledExternalLink
              href={work.href}
              className='group-data-[state=collapsed]/card:text-fg-subtle text-gray-100 transition-colors duration-300 hover:text-white active:text-blue-300'
            >
              {work.title}
            </UnstyledExternalLink>
          </h3>

          <div
            inert={!isExpanded}
            className={`flex flex-col gap-6 transition-[opacity,translate] duration-1100 group-data-[state=collapsed]/card:translate-y-2 group-data-[state=collapsed]/card:opacity-0 motion-reduce:transition-none ${easeCarousel}`}
          >
            <p className='text-fg-muted text-sm leading-relaxed'>
              {work.description}
            </p>
            {work.media && <MediaImage {...work.media} />}
          </div>

          <div className="text-fg-muted mt-auto flex gap-2 font-mono text-xs tracking-widest uppercase [&>span+span]:before:mr-2 [&>span+span]:before:content-['·']">
            {work.metaTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.li>
  )
}
