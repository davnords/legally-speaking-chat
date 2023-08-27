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
import { ChatBubblePanel } from './chat-panel';
import { EmptyScreen } from '@/components/empty-screen'
import { ExampleQuestions } from './example.questions';
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'react-hot-toast'
import { getStaticExampleQuestions, getIntroText } from '@/lib/api-helper';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string,
  namespaceId?: string,
  namespaceTitle?: string
}

export function ChatBubble({ id, initialMessages, className, namespaceId, namespaceTitle }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [fetchedResponse, setFetchedResponse] = useState<[Document[], number] | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [exampleQuestions, setExampleQuestions] = useState<string[] | null>(null)
  const [introText, setIntroText] = useState<string | null>(null)

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
        console.log('fetch called')
        await fetch(`${process.env.NEXT_PUBLIC_HOSTING_URL}/api/sources?id=${id}`)
          .then((res) => res.json())
          .then((data) => {
            const response = data.response.response
            setFetchedResponse(response)
          })
      },
    })

  useEffect(() => {
    const fetchData = async () => {
      setLoadingQuestions(true)
      const introText = await getIntroText(namespaceId!)
      setIntroText(introText!)
      const questionsResponse = await getStaticExampleQuestions(namespaceId!)
      const questionList = questionsResponse?.map((obj) => obj.question)
      setExampleQuestions(questionList!)
      setLoadingQuestions(false)
    }
    fetchData()
  }, []) // <-- empty dependency array (to only trigger at mounting)

  useEffect(() => {
    if (fetchedResponse) {
      console.log(fetchedResponse)
    }
  }, [fetchedResponse]);

  return (
    <>
      <div className={cn('pb-[20px] pt-4 md:pt-10', className)}>
        {exampleQuestions ? (
          <ExampleQuestions loading={loadingQuestions} setInput={setInput} questions={exampleQuestions} introText={introText}/>
        ) : null}
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : null}

      </div>
      <ChatBubblePanel
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
