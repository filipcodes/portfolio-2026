import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { WRITING_SECTION_ID } from '@/routes/-home/components/WritingSection'
import { InPageScroll } from '@/shared/components/InPageScroll'
import { links } from '@/shared/constants/links'
import { fadeUp, staggerContainer } from '@/shared/constants/motion'

interface HeroCtaLinkProps {
  href: string
  children: ReactNode
  emphasized?: boolean
}

function HeroCtaLink({ href, children, emphasized = false }: HeroCtaLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`group inline-flex items-center gap-1 transition-colors ${
        emphasized ? 'text-signal hover:text-fg' : 'text-fg-muted hover:text-fg'
      }`}
    >
      <span
        aria-hidden='true'
        className={
          emphasized
            ? 'text-signal-dim group-hover:text-signal'
            : 'text-fg-subtle group-hover:text-fg-muted'
        }
      >
        [
      </span>

      {children}

      <span
        aria-hidden='true'
        className={
          emphasized
            ? 'text-signal-dim group-hover:text-signal'
            : 'text-fg-subtle group-hover:text-fg-muted'
        }
      >
        ]
      </span>
    </a>
  )
}

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
        className='text-fg-muted mb-10 max-w-2xl text-lg leading-relaxed md:text-xl'
      >
        Senior full-stack engineer building fast, reliable products that stay
        maintainable at scale.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className='text-fg-muted mb-12 font-mono text-xs tracking-widest uppercase'
      >
        TypeScript · React · Node.js · AWS
      </motion.p>

      <motion.div
        variants={fadeUp}
        className='flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-widest uppercase'
      >
        <HeroCtaLink href={links.github}>GitHub</HeroCtaLink>
        <HeroCtaLink href={links.linkedin} emphasized>
          LinkedIn
        </HeroCtaLink>
        <HeroCtaLink href={links.cv}>CV</HeroCtaLink>
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
        <p className='text-fg-subtle hidden md:block'>Europe · CET</p>
        <p className='text-fg-subtle hidden md:block'>48.15°N · 17.11°E</p>
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
