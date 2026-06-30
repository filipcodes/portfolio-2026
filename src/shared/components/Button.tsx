import type { ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string
}

export function Button({ label, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`group text-fg-muted hover:text-fg aria-pressed:text-signal inline-flex items-center gap-1 font-mono text-xs tracking-widest uppercase transition-colors ${className ?? ''}`}
      {...rest}
    >
      <span
        aria-hidden='true'
        className='text-fg-subtle group-hover:text-fg-muted group-aria-pressed:text-signal'
      >
        [
      </span>
      {label}
      <span
        aria-hidden='true'
        className='text-fg-subtle group-hover:text-fg-muted group-aria-pressed:text-signal'
      >
        ]
      </span>
    </button>
  )
}
