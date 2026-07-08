import { AnimatePresence, motion } from 'motion/react'

import { MediaImage } from '@/MediaImage'
import type { Work } from '@/routes/-home/constants/works'
import { UnstyledExternalLink } from '@/shared/components/ExternalLink'
import { fadeUp, reveal } from '@/shared/constants/motion'

export type ColumnState = 'expanded' | 'collapsed'

const BASIS_CLASS_BY_STATE: Record<ColumnState, string> = {
  expanded: 'basis-[calc(100%-(var(--cols)-1)*40%/max(var(--cols)-1,1))]',
  collapsed: 'basis-[calc(40%/max(var(--cols)-1,1))]',
}

interface WorkColumnProps {
  work: Work
  state: ColumnState
}

export function WorkColumn({ work, state }: WorkColumnProps) {
  const isExpanded = state === 'expanded'

  return (
    <motion.li
      variants={fadeUp}
      data-state={state}
      className={`group/card relative flex min-w-0 shrink-0 grow-0 flex-col gap-6 overflow-hidden p-6 transition-[flex-basis] duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)] ${BASIS_CLASS_BY_STATE[state]}`}
    >
      <p className='text-signal font-mono text-xs tracking-widest uppercase'>
        {work.tag}
      </p>
      <h3 className='font-display w-[calc(100cqw/var(--cols)-3rem)] overflow-hidden text-5xl tracking-tight'>
        <UnstyledExternalLink
          href={work.href}
          className='group-data-[state=collapsed]/card:text-fg-subtle text-gray-100 transition-colors duration-300 hover:text-white active:text-blue-300'
        >
          {work.title}
        </UnstyledExternalLink>
      </h3>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ ...reveal.initial, height: 0 }}
            animate={{ ...reveal.animate, height: 'auto' }}
            exit={{ ...reveal.exit, height: 0 }}
            className='flex flex-col gap-6 overflow-hidden'
          >
            <p className='text-fg-muted text-sm leading-relaxed'>
              {work.description}
            </p>
            {work.media && <MediaImage {...work.media} />}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-fg-muted mt-auto flex gap-2 font-mono text-xs tracking-widest uppercase [&>span+span]:before:mr-2 [&>span+span]:before:content-['·']">
        {work.metaTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.li>
  )
}
