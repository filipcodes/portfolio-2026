import type { AnchorHTMLAttributes } from 'react'

import { linkClassName } from '@/shared/constants/linkStyles'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export function ExternalLink({
  className,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      {...props}
      className={`${linkClassName} ${className ?? ''}`}
    >
      {children}
    </a>
  )
}
