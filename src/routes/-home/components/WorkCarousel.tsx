import { motion, useInView, useReducedMotion } from 'motion/react'
import { type CSSProperties, useRef, useState } from 'react'

import {
  type ColumnState,
  WorkColumn,
} from '@/routes/-home/components/WorkColumn'
import type { Work } from '@/routes/-home/constants/works'
import { Reveal } from '@/shared/components/Reveal'
import { staggerContainer, viewportOnce } from '@/shared/constants/motion'

const stepButtonClassName =
  'border-border text-fg-muted hover:border-fg-subtle hover:text-fg active:text-signal flex size-10 cursor-pointer items-center justify-center border font-mono transition-colors duration-150'

function getColumnState(active: number, index: number): ColumnState {
  return active === index ? 'expanded' : 'collapsed'
}

interface WorkCarouselNavigationProps {
  step: (direction: 1 | -1) => void
}

function WorkCarouselNavigation({ step }: WorkCarouselNavigationProps) {
  return (
    <Reveal className='mt-4 flex justify-end gap-2'>
      <button
        type='button'
        aria-label='Previous project'
        className={stepButtonClassName}
        onClick={() => {
          step(-1)
        }}
      >
        ←
      </button>
      <button
        type='button'
        aria-label='Next project'
        className={stepButtonClassName}
        onClick={() => {
          step(1)
        }}
      >
        →
      </button>
    </Reveal>
  )
}

interface WorkCarouselProps {
  works: readonly Work[]
}

export function WorkCarousel({ works }: WorkCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef, { amount: 0.5 })
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const count = works.length
  const autoAdvance = count > 1 && inView && !reducedMotion

  const step = (direction: 1 | -1) => {
    setActive((prev) => (prev + direction + count) % count)
  }

  return (
    <div
      onPointerEnter={() => {
        setHovered(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
      }}
      onFocus={(event) => {
        if (event.target.matches(':focus-visible')) setFocused(true)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false)
        }
      }}
    >
      <motion.ul
        ref={listRef}
        className='border-border after:fade-x @container relative flex h-[700px] border-y after:pointer-events-none after:absolute after:inset-0 after:z-10 after:content-[""]'
        style={{ '--cols': count } as CSSProperties}
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={viewportOnce}
      >
        {works.map((work, index) => (
          <WorkColumn
            key={work.title}
            work={work}
            state={getColumnState(active, index)}
            timerPaused={hovered || focused}
            onAutoAdvance={
              autoAdvance && index === active
                ? () => {
                    step(1)
                  }
                : undefined
            }
          />
        ))}
      </motion.ul>

      {count > 1 && <WorkCarouselNavigation step={step} />}
    </div>
  )
}
