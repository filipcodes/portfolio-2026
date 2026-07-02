import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'>

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      type='button'
      className={`group text-fg-muted hover:text-fg aria-pressed:text-signal inline-flex items-center gap-1 font-mono text-xs tracking-widest uppercase transition-colors ${className ?? ''}`}
      {...rest}
    >
      <span
        aria-hidden='true'
        className='text-fg-subtle group-hover:text-fg-muted group-aria-pressed:text-signal'
      >
        [
      </span>
      {children}
      <span
        aria-hidden='true'
        className='text-fg-subtle group-hover:text-fg-muted group-aria-pressed:text-signal'
      >
        ]
      </span>
    </button>
  )
}
