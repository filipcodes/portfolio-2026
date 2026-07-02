export type WorkMedia = 'github-graph'

export interface Work {
  tag: string
  title: string
  href: string
  description: string
  meta: string
  media?: WorkMedia
}

export const works: readonly Work[] = [
  {
    tag: 'Interactive',
    title: 'Lorem ipsum dolor',
    href: 'http://',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
    meta: '2026 · TypeScript',
    media: 'github-graph',
  },
  {
    tag: 'System',
    title: 'Consectetur adipiscing',
    href: 'https://github.com/filipcodes/portfolio-2026',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip.',
    meta: '2026 · Active',
  },
  {
    tag: 'Experiment',
    title: 'Sed do eiusmod tempor',
    href: 'http://',
    description:
      'Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore.',
    meta: '2025 · Draft',
  },
]
