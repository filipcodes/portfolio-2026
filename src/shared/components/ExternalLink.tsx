import type { AnchorHTMLAttributes } from 'react'

import { linkClassName } from '@/shared/constants/linkStyles'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export function UnstyledExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </a>
  )
}

export function ExternalLink({ className, ...props }: ExternalLinkProps) {
  return (
    <UnstyledExternalLink
      {...props}
      className={`${linkClassName} ${className ?? ''}`}
    />
  )
}
