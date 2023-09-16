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
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { generateNewExampleQuestions } from '@/lib/api-helper';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string,
  namespaceId?: string,
  namespaceTitle?: string
  gettingStartedMessage?: string
}

export function Chat({ id, initialMessages, className, namespaceId, namespaceTitle, gettingStartedMessage }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [fetchedResponse, setFetchedResponse] = useState<[Document[], number] | null>(null);
  const [showSources, setShowSources] = useState<boolean>(false);
  const [exampleQuestions, setExampleQuestions] = useState<string[] | null>(null)
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false)

  const changeShowSources = () => {
    setShowSources(!showSources)
  }

  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
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
      const questionsResponse = await generateNewExampleQuestions(namespaceId!);
      setExampleQuestions((questionsResponse as any)?.questions)
      setLoadingQuestions(false)
    }
    if (messages?.length) {
      reload()
    }
    fetchData()
  }, [namespaceId])

  useEffect(() => {
    if (fetchedResponse) {
      console.log(fetchedResponse)
    }
  }, [fetchedResponse]);

  useEffect(() => {
    if (gettingStartedMessage && namespaceId) {
      append({
        id,
        role: 'system',
        content: gettingStartedMessage,
        name: 'hide'
      })
    }
  }, [gettingStartedMessage, namespaceId])

  return (
    <>
      <h1 className="mb-2 text-lg font-semibold text-center pt-[30px]">
        Chattar med data från: <span className="text-yellow-500">{namespaceTitle}</span>
      </h1>
      {fetchedResponse && (
        <button
          onClick={changeShowSources} className="mb-6 text-sm flex w-full mx-auto items-center justify-center rounded-md bg-white p-3 font-small text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white"
          style={{ width: 'fit-content' }}
        >
          {showSources ? 'Hide Sources' : 'Show Sources'}
        </button>
      )}
      {fetchedResponse && showSources && (
        <div
          className="p-5"
        >
          <Accordion
            type="single"
            collapsible
            className="flex-col"
          >
            {fetchedResponse.map((doc: any, index: any) => (
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
                      <b>Source:</b> <a href='/' target="_blank" rel="noopener noreferrer" className="link" style={{ color: 'blue' }}>{doc[0].metadata.url}</a>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      )}
      <ExampleQuestions loading={loadingQuestions} setInput={setInput} questions={exampleQuestions} />
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
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

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
