import { UnstyledExternalLink } from '@/shared/components/ExternalLink'

interface MediaImageProps {
  src: string
  alt: string
  label: string
  href: string
}

export function MediaImage({ src, alt, label, href }: MediaImageProps) {
  return (
    <figure className='border-border border'>
      <figcaption className='border-border border-b font-mono text-[10px] tracking-widest uppercase'>
        <UnstyledExternalLink
          href={href}
          className='group/media text-fg-subtle hover:text-fg-muted flex items-center justify-between px-3 py-2 transition-colors'
        >
          <span className='flex items-center gap-2'>
            <span
              aria-hidden
              className='bg-signal size-1.5 animate-pulse rounded-full'
            />
            {label}
          </span>
          <span
            aria-hidden
            className='transition-transform duration-300 group-hover/media:translate-x-1'
          >
            →
          </span>
        </UnstyledExternalLink>
      </figcaption>
      <img
        src={src}
        alt={alt}
        loading='lazy'
        className='aspect-2/1 w-full object-cover object-top saturate-[0.65] md:aspect-auto md:h-80'
      />
    </figure>
  )
}
