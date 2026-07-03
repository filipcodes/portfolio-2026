import { motion } from 'motion/react'

import { WRITING_SECTION_ID } from '@/routes/-home/components/WritingSection'
import { ExternalLink } from '@/shared/components/ExternalLink'
import { InPageScroll } from '@/shared/components/InPageScroll'
import { links } from '@/shared/constants/links'
import { fadeUp, staggerContainer } from '@/shared/constants/motion'

function HeroMainContent() {
  return (
    <motion.div
      className='max-w-3xl'
      variants={staggerContainer}
      initial='hidden'
      animate='visible'
    >
      <motion.h1
        variants={fadeUp}
        className='mb-8 font-mono text-6xl font-bold tracking-tighter md:text-8xl'
      >
        Filip Sipos.
      </motion.h1>
      <motion.h2
        variants={fadeUp}
        className='text-fg-muted mb-10 text-lg leading-relaxed md:text-xl'
      >
        Senior full-stack developer.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className='text-fg-muted font-mono text-xs tracking-widest uppercase'
      >
        Europe · UTC+01:00
      </motion.p>

      <motion.p
        variants={fadeUp}
        className='text-fg-subtle mb-6 font-mono text-xs tracking-widest uppercase'
      >
        48.15°N · 17.11°E
      </motion.p>

      <motion.div
        variants={fadeUp}
        className='flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-widest uppercase'
      >
        <ExternalLink href={links.github}>GitHub</ExternalLink>
        <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
        <ExternalLink href={links.cv}>CV</ExternalLink>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className='relative flex min-h-screen items-end pb-24'>
      <motion.div
        className='text-fg-muted absolute top-32 right-0 space-y-2 text-right font-mono text-xs tracking-widest uppercase'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p>2026 · Portfolio</p>
        <p className='flex items-center justify-end gap-2'>
          <span className='bg-signal size-1.5 animate-pulse rounded-full' />
          Open to interesting problems
        </p>
      </motion.div>

      <HeroMainContent />

      <motion.div
        className='absolute right-0 bottom-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <InPageScroll
          target={`#${WRITING_SECTION_ID}`}
          iconPlacement='trailing'
        >
          Scroll
        </InPageScroll>
      </motion.div>
    </section>
  )
}
