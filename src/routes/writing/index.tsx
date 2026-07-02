import { createFileRoute } from '@tanstack/react-router'

import { Link } from '@/shared/components/Link'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { featuredArticles } from '@/shared/constants/featuredArticles'
import { estimateMinutesToRead } from '@/shared/utils/estimateMinutesToRead'
import { formatArticleDate } from '@/shared/utils/formatArticleDate'

export const Route = createFileRoute('/writing/')({
  component: WritingIndexPage,
})

function WritingIndexPage() {
  return (
    <section className='pt-32'>
      <Link
        to='/'
        className='text-fg-muted mb-12 inline-block font-mono text-xs tracking-widest uppercase'
      >
        ← Back to &quot;home&quot;
      </Link>

      <SectionHeading label='Writing' addendum={featuredArticles.length} />
      <ul className='border-border border-t'>
        {featuredArticles.map((article) => (
          <li key={article.slug} className='border-border border-b'>
            <Link
              to='/writing/$slug'
              params={{ slug: article.slug }}
              className='group flex items-baseline gap-6 py-6 hover:no-underline!'
            >
              <div className='flex-1 transition-transform duration-300 ease-out group-hover:translate-x-4'>
                <h2 className='font-display text-xl tracking-tight md:text-2xl'>
                  {article.title}
                </h2>
                <p className='text-fg-muted mt-2 font-mono text-xs tracking-widest uppercase'>
                  <time dateTime={article.date}>
                    {formatArticleDate(article.date)}
                  </time>
                </p>
              </div>
              <span className='text-fg-muted font-mono text-xs tracking-widest uppercase tabular-nums'>
                {estimateMinutesToRead(article.content)} MIN
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
