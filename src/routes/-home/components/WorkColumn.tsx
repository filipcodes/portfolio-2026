import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'

import { GithubGraph } from '@/GithubGraph'
import type { Work, WorkMedia } from '@/routes/-home/constants/works'
import { ExternalLink } from '@/shared/components/ExternalLink'
import { fadeUp, reveal } from '@/shared/constants/motion'

export type ColumnState = 'idle' | 'expanded' | 'collapsed'

export type TransitionDuration = 'normal' | 'handoff'

const BASIS_CLASS_BY_STATE: Record<ColumnState, string> = {
  idle: 'md:basis-[calc(100%/var(--cols))]',
  expanded: 'md:basis-[calc(100%-(var(--cols)-1)*40%/max(var(--cols)-1,1))]',
  collapsed: 'md:basis-[calc(40%/max(var(--cols)-1,1))]',
}

const DURATION_CLASS_BY_KIND: Record<TransitionDuration, string> = {
  normal: 'md:duration-700',
  handoff: 'md:duration-1100', // Hovering from one card to another without exiting
}

const MEDIA_COMPONENTS = {
  'github-graph': GithubGraph,
} as const satisfies Record<WorkMedia, () => ReactNode>

interface WorkMediaSlotProps {
  media: WorkMedia
}

function WorkMediaSlot({ media }: WorkMediaSlotProps) {
  const Component = MEDIA_COMPONENTS[media]
  return <Component />
}

interface WorkColumnProps {
  work: Work
  state: ColumnState
  duration: TransitionDuration
  onHover: () => void
}

export function WorkColumn({
  work,
  state,
  duration,
  onHover,
}: WorkColumnProps) {
  const isExpanded = state === 'expanded'

  return (
    <motion.li
      variants={fadeUp}
      data-state={state}
      onMouseEnter={onHover}
      className={`group/card relative flex flex-col gap-6 overflow-hidden px-2 py-6 md:min-w-0 md:shrink-0 md:grow-0 md:px-6 md:transition-[flex-basis] md:ease-[cubic-bezier(0.16,1,0.3,1)] ${BASIS_CLASS_BY_STATE[state]} ${DURATION_CLASS_BY_KIND[duration]}`}
    >
      <p className='text-signal font-mono text-xs tracking-widest uppercase'>
        {work.tag}
      </p>
      <h3 className='font-display overflow-hidden text-3xl tracking-tight md:w-[calc(100cqw/var(--cols)-3rem)] md:text-5xl'>
        <ExternalLink
          href={work.href}
          className='group-data-[state=collapsed]/card:text-fg-subtle transition-colors duration-300 hover:no-underline!'
        >
          {work.title}
        </ExternalLink>
      </h3>

      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={reveal.initial}
            animate={reveal.animate}
            exit={reveal.exit}
            className='text-fg-muted text-sm leading-relaxed'
          >
            {work.description}
          </motion.p>
        )}
      </AnimatePresence>

      {work.media && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ ...reveal.initial, maxHeight: 0 }}
              animate={{ ...reveal.animate, maxHeight: 260 }}
              exit={{ ...reveal.exit, maxHeight: 0 }}
              className='overflow-hidden'
            >
              <WorkMediaSlot media={work.media} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <p className='text-fg-muted mt-auto font-mono text-xs tracking-widest uppercase'>
        {work.meta}
      </p>
    </motion.li>
  )
}
