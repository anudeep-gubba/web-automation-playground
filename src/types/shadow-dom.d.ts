import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type CustomElementProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T> & { label?: string }

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'automation-input': CustomElementProps<HTMLElement>
      'automation-button': CustomElementProps<HTMLElement>
      'automation-dropdown': CustomElementProps<HTMLElement>
      'automation-nested-host': CustomElementProps<HTMLElement>
    }
  }
}

export {}
