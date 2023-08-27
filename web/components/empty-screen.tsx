import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: `Learn about the company`,
    message: `Can you tell me about the company?`
  },
  {
    heading: 'Understand the product offering',
    message: 'What products does this company offer?'
  },
  {
    heading: 'Enable convenience',
    message: `What are the opening hours?`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome, here you can chat with your data!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a demo of our Chatbot service API that can be integrated with any website in seconds and provide a customized experience. For further information please visit{'\u0020'}
          <ExternalLink href="/">Chat-connect-technologies.ai</ExternalLink>.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can freely chat with your data or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
