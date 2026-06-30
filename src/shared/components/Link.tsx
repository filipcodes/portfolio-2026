import { createLink, type LinkComponent } from '@tanstack/react-router'
import type { AnchorHTMLAttributes, Ref } from 'react'

import {
  activeLinkClassName,
  linkClassName,
} from '@/shared/constants/linkStyles'

type BasicLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ref?: Ref<HTMLAnchorElement>
}

function BasicLink({ className, children, ...props }: BasicLinkProps) {
  return (
    <a {...props} className={`${linkClassName} ${className ?? ''}`}>
      {children}
    </a>
  )
}

const CreatedLink = createLink(BasicLink)

export const Link: LinkComponent<typeof BasicLink> = (props) => (
  <CreatedLink
    preload='intent'
    activeProps={{ className: activeLinkClassName }}
    {...props}
  />
)
