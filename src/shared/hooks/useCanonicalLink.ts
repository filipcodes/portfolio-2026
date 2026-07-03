import { useEffect } from 'react'

import { SITE_ORIGIN } from '@/shared/constants/site'

export function useCanonicalLink(pathname: string) {
  useEffect(() => {
    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )

    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.append(link)
    }

    const path = pathname.replace(/\/+$/, '')
    link.href = path ? `${SITE_ORIGIN}${path}` : `${SITE_ORIGIN}/`
  }, [pathname])
}
