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
      <UnstyledExternalLink
        href={href}
        className='text-fg-subtle group/media hover:text-fg-muted transition-colors'
      >
        <figcaption className='border-border flex justify-between border-b p-2 font-mono text-[10px] tracking-widest uppercase'>
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
        </figcaption>
        <img
          src={src}
          alt={alt}
          loading='lazy'
          className='aspect-2/1 w-full object-cover object-top saturate-[0.65]'
        />
      </UnstyledExternalLink>
    </figure>
  )
}
