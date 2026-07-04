import { createFileRoute, notFound } from '@tanstack/react-router'

import { Link } from '@/shared/components/Link'
import { featuredArticles } from '@/shared/constants/featuredArticles'
import { SITE_NAME } from '@/shared/constants/site'
import { estimateMinutesToRead } from '@/shared/utils/estimateMinutesToRead'
import { formatArticleDate } from '@/shared/utils/formatArticleDate'

export const Route = createFileRoute('/writing/$slug')({
  loader: ({ params }) => {
    const article = featuredArticles.find((entry) => entry.slug === params.slug)
    if (!article) throw notFound()
    return article
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} · ${SITE_NAME}` : SITE_NAME },
    ],
  }),
  component: WritingArticlePage,
})

function WritingArticlePage() {
  const article = Route.useLoaderData()

  return (
    <article className='mx-auto max-w-2xl py-32'>
      <Link
        to='/writing'
        activeOptions={{ exact: true }}
        className='text-fg-muted font-mono text-xs tracking-widest uppercase'
      >
        ← Back to &quot;writing&quot;
      </Link>

      <header className='mt-12 mb-16'>
        <h1 className='font-display text-3xl tracking-tight md:text-5xl'>
          {article.title}
        </h1>
        <p className='text-fg-muted mt-6 font-mono text-xs tracking-widest uppercase'>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>{' '}
          · {estimateMinutesToRead(article.content)} MIN
        </p>
      </header>

      <div className='space-y-6 text-lg leading-relaxed'>
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.index}>{paragraph.text}</p>
        ))}
      </div>
    </article>
  )
}
