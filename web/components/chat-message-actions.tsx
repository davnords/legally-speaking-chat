'use client'

import { type Message } from 'ai'

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'
import { BookIcon } from 'lucide-react'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
  setShowSources?: (arg0: boolean) => void
  index?: number
  setSourceNumber?: (arg0: number) => void
}

export function ChatMessageActions({
  message,
  setShowSources,
  index,
  setSourceNumber,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  const handleSourceClick = () => {
    if (setSourceNumber && setShowSources && index) {
      setSourceNumber(index)
      setShowSources(true)
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
        className
      )}
      {...props}
    >
      {message.role === 'assistant' && setShowSources ?
        <>
          <Button variant="ghost" size="icon" onClick={handleSourceClick}>
            <BookIcon size={14} />
            <span className="sr-only">Show sources</span>
          </Button>
        </> : null}
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  )
}
