import { UseChatHelpers } from 'ai/react'
import { ExternalLink } from '../external-link'

export function DemoExampleQuestions() {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8">
                <h1 className="mb-2 text-base font-semibold">
                    Välkommen till vår chattdemo! 
                </h1>
                <p className="mb-2 text-sm leading-normal text-muted-foreground">
                    Du är just nu i vår demoversion. För att integrera på din egna hemsida klicka <ExternalLink href='https://chat-connect-technologies-3dhe.vercel.app/'>Här</ExternalLink> 
                </p>
            </div>
        </div>
    )
}
