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
    title: 'GitHub graph',
    href: 'http://',
    description:
      'A scope-aware contribution graph visualizer, built with React and Tailwind.',
    meta: '2026 · TypeScript',
    media: 'github-graph',
  },
  {
    tag: 'System',
    title: 'Portfolio 2026',
    href: 'https://github.com/filipcodes/portfolio-2026',
    description:
      'This site. Editorial-restraint design system with phased header transitions and a custom layout vocabulary.',
    meta: '2026 · Active',
  },
  {
    tag: 'Experiment',
    title: 'Token economy',
    href: 'http://',
    description:
      'A dashboard for analyzing LLM token usage patterns across multi-provider workflows.',
    meta: '2025 · Draft',
  },
]
