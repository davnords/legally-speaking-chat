import { type UseChatHelpers } from 'ai/react'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { EmbeddedPromptForm } from './prompt-form'
import { ExternalLink } from '../external-link'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function EmbeddedChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  return (
    <div className="bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50% absolute bottom-0 h-98px" style={{ width: '-webkit-fill-available' }}>
      <ButtonScrollToBottom />
      <div className="mx-auto pb-4 sm:max-w-2xl sm:px-4 pr-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <EmbeddedPromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
        <div
        className="text-center mt-2 text-xs text-gray-500"
      >
        Powered By <ExternalLink href='https://chatter-flow.vercel.app/'>ChatterFlow</ExternalLink>
      </div>
      </div>
    </div>
  )
}
