import streamPlanScreenshot from '@/assets/work/stream-plan.webp'
import zircuitBridgeScreenshot from '@/assets/work/zircuit-bridge.webp'

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
    href: 'https://bridge.zircuit.com/',
    description:
      'I co-architected the Zircuit Explorer and Bridge - the primary interfaces to an Ethereum L2 focused on AI-driven security - and led the dev team for part of the engagement.',
    metaTags: ['2025', 'React', 'Web3'],
    media: {
      src: zircuitBridgeScreenshot,
      alt: 'The Zircuit bridge interface with an Ethereum to Zircuit Mainnet transfer ready to go',
      label: 'bridge.zircuit.com',
      href: 'https://bridge.zircuit.com/',
    },
  },
  {
    tag: 'Public Client Work',
    title: 'The Stream Protection Portal',
    href: 'https://www.thestreamplan.com/',
    description:
      'I co-developed The Stream Protection Portal - a digital layer over US insurance paperwork that plugs into the processes and documentation of four major United States insurers.',
    metaTags: ['2025', 'Next.js', 'Insurance'],
    media: {
      src: streamPlanScreenshot,
      alt: 'The Stream plan website highlighting tax-free retirement income',
      label: 'thestreamplan.com',
      href: 'https://www.thestreamplan.com/',
    },
  },
]
