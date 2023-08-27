import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'

export interface ChatList {
  messages: Message[]
  setShowSources?: (arg0: boolean) => void
  setSourceNumber?: (arg0: number) => void
}

export function ChatList({ messages, setShowSources, setSourceNumber }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 mt-4">
      {messages.map((message, index) => (
        message.name !== 'hide' ? <div key={index}>
          <ChatMessage message={message} setShowSources={setShowSources} setSourceNumber={setSourceNumber} index={index}/>
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div> : null
      ))}
    </div>
  )
}
