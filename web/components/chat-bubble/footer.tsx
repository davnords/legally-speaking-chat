import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      AI chat bot powered by{' '}
      <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and <ExternalLink href="https://openai.com">Openai</ExternalLink> and{' '}
      <ExternalLink href="https://python.langchain.com/docs/get_started/introduction.html">
        Langchain
      </ExternalLink>
      .
    </p>
  )
}
