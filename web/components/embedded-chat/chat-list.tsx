import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { EmbeddedChatMessage } from './chat-message'

export interface ChatList {
  messages: Message[]
}

export function EmbeddedChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 mt-4">
      {messages.map((message, index) => (
        message.name !== 'hide' ? <div key={index}>
          <EmbeddedChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div> : null
      ))}
    </div>
  )
}
