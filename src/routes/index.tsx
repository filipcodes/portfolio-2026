import { createFileRoute, Link } from '@tanstack/react-router'

import { GithubGraph } from '@/GithubGraph'
import { SectionHeading } from '@/shared/components/SectionHeading'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <section className='flex h-96 items-end'>
        <div>
          <h1 className='mb-6 text-4xl'>Filip Sipos.</h1>
          <h2 className='mb-4'>
            Senior AI-enabled developer - looking for opportunities in exciting
            industries etc.
          </h2>
          <p className='mb-2'>Bratislava / Europe</p>
          <div className='flex gap-4'>
            <a className='inline-block' href='http://'>
              GitHub /
            </a>
            <a className='inline-block' href='http://'>
              LinkedIn /
            </a>
            <a className='inline-block' href='http://'>
              CV
            </a>
          </div>
        </div>
      </section>
      <SectionHeading label='Featured Writing' addendum={3} />
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
      <Link to='/writing'>See all</Link>

      <SectionHeading label='Training' addendum={2} />
      <GithubGraph />
      <p>Query this data!</p>

      <li>section: Call to action Section (Work with me)</li>
    </>
  )
}
