import { motion } from 'motion/react'

import { Link } from '@/shared/components/Link'
import { Reveal } from '@/shared/components/Reveal'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { featuredArticles } from '@/shared/constants/featuredArticles'
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '@/shared/constants/motion'
import { estimateMinutesToRead } from '@/shared/utils/estimateMinutesToRead'
import { formatArticleDate } from '@/shared/utils/formatArticleDate'

export function WritingSection() {
  return (
    <section>
      <Reveal>
        <SectionHeading
          label='Featured Writing'
          addendum={featuredArticles.length}
        />
      </Reveal>

      <motion.ul
        className='border-border border-t'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={viewportOnce}
      >
        {featuredArticles.map((article, index) => (
          <motion.li
            key={article.slug}
            variants={fadeUp}
            className='border-border border-b'
          >
            <Link
              to='/writing/$slug'
              params={{ slug: article.slug }}
              className='group relative isolate block overflow-hidden py-8 hover:no-underline!'
            >
              <span
                aria-hidden
                className='text-fg-subtle/25 group-hover:text-fg-subtle/45 pointer-events-none absolute top-1/2 left-0 -z-10 -translate-y-1/2 font-mono text-7xl leading-none tracking-tighter tabular-nums transition-colors duration-300 select-none md:text-[9rem]'
              >
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div className='flex items-baseline gap-6'>
                <div className='flex-1 transition-transform duration-300 ease-out group-hover:translate-x-4'>
                  <h3 className='font-display text-2xl tracking-tight md:text-4xl'>
                    {article.title}
                  </h3>
                  <p className='text-fg-muted mt-2 font-mono text-xs tracking-widest uppercase [text-shadow:0_0_6px_var(--color-bg),0_0_3px_var(--color-bg)]'>
                    <time dateTime={article.date}>
                      {formatArticleDate(article.date)}
                    </time>
                  </p>
                </div>
                <span className='text-fg-muted font-mono text-xs tracking-widest uppercase tabular-nums'>
                  {estimateMinutesToRead(article.content)} MIN
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
      <Link
        to='/writing'
        className='text-fg-muted mt-6 inline-block font-mono text-xs tracking-widest uppercase'
      >
        See all →
      </Link>
    </section>
  )
}
