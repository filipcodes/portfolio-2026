import { createFileRoute, Link } from '@tanstack/react-router'

import { SectionHeading } from '@/shared/components/SectionHeading'

export const Route = createFileRoute('/writing/')({
  component: WritingIndexPage,
})

function WritingIndexPage() {
  return (
    <>
      <SectionHeading label='Writing' />
      <ul>
        <li>
          <Link to='/writing/$slug' params={{ slug: 'article-1' }}>
            Article 1 - Date published
          </Link>
        </li>
        <li>
          <Link to='/writing/$slug' params={{ slug: 'article-2' }}>
            Article 2 - Date published
          </Link>
        </li>
        <li>
          <Link to='/writing/$slug' params={{ slug: 'article-3' }}>
            Article 3 - Date published
          </Link>
        </li>
      </ul>
    </>
  )
}
