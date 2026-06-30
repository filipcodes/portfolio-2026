import { createFileRoute } from '@tanstack/react-router'

import { Link } from '@/shared/components/Link'
import { featuredArticles } from '@/shared/constants/featuredArticles'
import { estimateMinutesToRead } from '@/shared/utils/estimateMinutesToRead'

export const Route = createFileRoute('/writing/$slug')({
  component: WritingArticlePage,
})

function WritingArticlePage() {
  const { slug } = Route.useParams()
  const article = featuredArticles.find((entry) => entry.slug === slug)

  if (!article) {
    return (
      <section className='pt-32 pb-32'>
        <Link
          to='/writing'
          className='text-fg-muted font-mono text-xs tracking-widest uppercase'
        >
          ← Back to &quot;writing&quot;
        </Link>
        <p className='mt-12 text-lg'>Article not found.</p>
      </section>
    )
  }

  return (
    <article className='mx-auto max-w-2xl pt-32 pb-32'>
      <Link
        to='/writing'
        className='text-fg-muted font-mono text-xs tracking-widest uppercase'
      >
        ← Back to &quot;writing&quot;
      </Link>

      <header className='mt-12 mb-16'>
        <h1 className='font-display text-3xl tracking-tight md:text-5xl'>
          {article.title}
        </h1>
        <p className='text-fg-muted mt-6 font-mono text-xs tracking-widest uppercase'>
          {article.date} · {estimateMinutesToRead(article.content)} MIN
        </p>
      </header>

      <div className='space-y-6 text-lg leading-relaxed'>
        {article.content.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
