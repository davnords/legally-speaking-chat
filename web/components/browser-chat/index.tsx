'use client'

import { useChat, type Message } from 'ai/react'
import { kv } from '@vercel/kv'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Document } from 'langchain/document'
import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ExampleQuestions } from './example-questions';
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { LinearProgress } from '@mui/material';
import { nanoid } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useState, useEffect } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input'
import { toast } from 'react-hot-toast'

export interface NamespaceProps {
    namespace: string;
    exampleQuestions: string[];
    introText: string;
    ui?: { color: string, title: string };
    projectName?: string
}

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string,
    namespaceId?: string,
    namespaceTitle?: string
    gettingStartedMessage?: string
    namespaceObject?: NamespaceProps
}

export function Chat({ id, initialMessages, className, namespaceId, namespaceTitle, gettingStartedMessage, namespaceObject }: ChatProps) {
    const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
        'ai-token',
        null
    )
    const [fetchedResponse, setFetchedResponse] = useState<[Document[], number] | null>(null);
    const [fetchedResponses, setFetchedResponses] = useState<Array<[Document[], number]>>([]);
    const [showSources, setShowSources] = useState<boolean>(false);
    const [sourceNumber, setSourceNumber] = useState<number>(0);

    const { messages, append, reload, stop, isLoading, input, setInput } =
        useChat({
            initialMessages,
            id,
            body: {
                id,
                previewToken,
            },
            api: '/api/chat-openai',
            onResponse(response) {
                if (response.status === 401) {
                    toast.error(response.statusText)
                }
            },
            async onFinish(message) {
                console.log('fetch called')
                await fetch(`${process.env.NEXT_PUBLIC_HOSTING_URL}/api/sources?id=${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const response = data.response.response
                        setFetchedResponse(response)
                        setFetchedResponses([...fetchedResponses, response])
                    })
            },
        })

    return (

        <>
            <h1 className="mb-2 text-lg font-semibold text-center pt-[30px]">
                LegallySpeaking AI
            </h1>
            <h3 className="mb-2 text-base text-center pt-[15px]">
                Testa vår jurudiska AI rådgvigare helt gratis
            </h3>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                <div className="relative mx-auto max-w-2xl px-4 mt-4">
                    <div>
                        <ChatMessage message={{ id: nanoid(), role: 'assistant', content: 'Hej! Jag är en juridisk AI rådgivare, fråga mig vad du vill så svarar jag bäst jag kan!' }} />
                        <Separator className="my-4 md:my-8" />
                    </div>
                </div>

                {messages.length ? (
                    <>
                        <ChatList messages={messages} setShowSources={setShowSources} setSourceNumber={setSourceNumber} />
                        <ChatScrollAnchor trackVisibility={isLoading} />
                    </>
                ) : null}

            </div>
            <ChatPanel
                id={id}
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
            />

            <Dialog open={showSources} onOpenChange={setShowSources}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sources for the message</DialogTitle>
                        <DialogDescription>
                            From your question we found the following sources that resemble its scemantic meaning. We have provided our chatbot with this context.
                        </DialogDescription>
                    </DialogHeader>
                    <Accordion
                        type="single"
                        collapsible
                        className="flex-col"
                    >
                        {fetchedResponses[Math.floor(sourceNumber / 2)] ?
                            <>
                                {fetchedResponses[Math.floor(sourceNumber / 2)].map((doc: any, index: any) => (
                                    <div key={`messageSourceDocs-${index}`}>
                                        <AccordionItem value={`item-${index}`}>
                                            <AccordionTrigger>
                                                <h3>Source: {index + 1}</h3>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="mt-2">
                                                    {doc[0].pageContent}
                                                </p>
                                                <div className="mt-2" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        style={{
                                                            color: `rgb(${Math.floor((1 - doc[1]) * 255)}, ${Math.floor(doc[1] * 255)}, 0)`,
                                                            marginRight: '8px',
                                                        }}
                                                    />
                                                    <b>Score: {doc[1].toFixed(2)}</b>
                                                </div>
                                                <p className="mt-2" style={{ fontSize: '14px' }}>
                                                    <b>Source:</b> <a href={doc[0].metadata.url} target="_blank" rel="noopener noreferrer" className="link" style={{ color: 'blue' }}>{doc[0].metadata.url}</a>
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </div>
                                ))}
                            </> : <LinearProgress />}
                    </Accordion>
                </DialogContent>
            </Dialog>
        </>
    )
}
