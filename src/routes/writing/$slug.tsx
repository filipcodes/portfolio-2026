import { createFileRoute, Link } from '@tanstack/react-router'

import { SectionHeading } from '@/shared/components/SectionHeading'

export const Route = createFileRoute('/writing/$slug')({
  component: WritingArticlePage,
})

function WritingArticlePage() {
  const { slug } = Route.useParams()

  return (
    <>
      <SectionHeading label={slug} />
      <article>
        <p>Article content for &ldquo;{slug}&rdquo; goes here.</p>
      </article>
      <Link to='/writing'>← Back to writing</Link>
    </>
  )
}
