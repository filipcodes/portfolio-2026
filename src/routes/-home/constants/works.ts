import streamPlanScreenshot from '@/assets/work/stream-plan.webp'
import zircuitScreenshot from '@/assets/work/zircuit.webp'

export interface WorkMedia {
  src: string
  alt: string
  label: string
  href: string
}

export interface Work {
  tag: string
  title: string
  href: string
  description: string
  metaTags: string[]
  media?: WorkMedia
}

export const works: readonly Work[] = [
  {
    tag: 'Public Client Work',
    title: 'Zircuit',
    href: 'https://explorer.zircuit.com/',
    description: 'I co-architected the Zircuit Explorer and Bridge.',
    metaTags: ['2025', 'React', 'Web3'],
    media: {
      src: zircuitScreenshot,
      alt: 'The Zircuit block explorer showing recent blocks and transactions',
      label: 'explorer.zircuit.com',
      href: 'https://explorer.zircuit.com/',
    },
  },
  {
    tag: 'Public Client Work',
    title: 'The Stream Protection Portal',
    href: 'https://www.thestreamplan.com/',
    description:
      'I worked closely with major US companies adapting the portal.',
    metaTags: ['2025', 'Next.js', 'Insurance'],
    media: {
      src: streamPlanScreenshot,
      alt: 'The Stream plan website highlighting tax-free retirement income',
      label: 'thestreamplan.com',
      href: 'https://www.thestreamplan.com/',
    },
  },
]
