'use client'

import { useChat, type Message } from 'ai/react'
import React from 'react';
import { Document } from 'langchain/document'
import { cn } from '@/lib/utils'
import { EmbeddedChatList } from './chat-list';
import { EmbeddedChatPanel } from './chat-panel';
import { ExampleQuestions } from './example-questions';
import { DemoExampleQuestions } from './demo-example-questions';
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getCompanyProfile } from '@/lib/api-helper';
import { CompanyProfile } from '@/../@chat-connect-libs/contracts/dist';
import { NamespaceProps } from '.';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string,
  namespaceId?: string,
  namespaceData: NamespaceProps | null
  isDemo?: boolean
}

export function EmbeddedChatComponent({ namespaceData, id, initialMessages, className, namespaceId, isDemo }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [fetchedResponse, setFetchedResponse] = useState<[Document[], number] | null>(null);

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken,
        namespaceId,
      },
      api: '/api/chat',
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      async onFinish(message) {
        console.log('Stream finished')
        // *** UNCOMMENT THIS IF YOU WANT SOURCES
        // await fetch(`${process.env.NEXT_PUBLIC_HOSTING_URL}/api/sources?id=${id}`)
        //   .then((res) => res.json())
        //   .then((data) => {
        //     const response = data.response.response
        //     setFetchedResponse(response)
        //   })
      },
    })

  useEffect(() => {
    if (fetchedResponse) {
      console.log(fetchedResponse)
    }
  }, [fetchedResponse]);

  return (
    <>
      <div className={cn('pb-[40px] pt-4 md:pt-10', className)}>
        {namespaceData?.exampleQuestions ? (
          <ExampleQuestions loading={false} setInput={setInput} questions={namespaceData.exampleQuestions} introText={namespaceData.introText} />
        ) : isDemo ? (
          <DemoExampleQuestions />
        ) : null}
        {messages.length ? (
          <>
            <EmbeddedChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : null}

      </div>
      <EmbeddedChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
