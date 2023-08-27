'use client'

import { useState } from 'react';
import Gradient from '@/components/ui/gradient';
import { useRouter } from 'next/navigation';
import { IngestForm } from '../preview-ingest/ingest-form';
import { IngestResult } from '../preview-ingest/ingest-result';
import ScrollOnMount from '../scroll-on-mount';
import { getIngestPreview, initiateDemo, saveDemo, useDemoNamespaces } from '../../lib/api-helper';
import { DemoNamespaces } from '../preview-ingest/demo-namespaces';
import { IngestPreviewQueryResult, InitiateDemoCommandResult } from '@/../@chat-connect-libs/contracts/dist';
import ChatBubbleIcon from './icon';
import ChatWindow from './chat-window';
import { ChatBubble } from './chat';
import { ExternalLink } from '@/components/external-link'


export type LoadingStatus = 'LOADING' | 'OK' | 'ERROR'

export interface IngestResultStatus {
    [pageName: string]: LoadingStatus
}


export function BubblePage() {
    const [nanoId, setNanoId] = useState<string | null>(null)
    const [demo, setDemo] = useState<InitiateDemoCommandResult | null>(null)
    const [errorMessage, setErrorMessage] = useState('');
    const [url, setUrl] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ingestResult, setIngestResult] = useState<IngestResultStatus>({})
    const [result, setResult] = useState<IngestPreviewQueryResult | null>(null)
    const demoNamespaces = useDemoNamespaces()
    const { push } = useRouter();

    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleChatClick = () => {
        setIsChatOpen(!isChatOpen);
    };

    const updateIngestResult = (pageName: string, status: LoadingStatus) => {
        setIngestResult(prev => ({ ...prev, [pageName]: status }))
    }

    const ingest = async () => {
        if (!url) {
            setErrorMessage('Both url and namespace is required to proceed')
            return
        }
        setErrorMessage('')
        setLoading(true);

        try {
            const demo = await initiateDemo(url)
            setDemo(demo!)
            const newResult = await getIngestPreview(url, demo?.namespaceId!)
            setResult(newResult!)

            setIngestResult(newResult!.crawledPages.reduce<{ [pageName: string]: LoadingStatus }>((a, b) => {
                a[b.pageName] = 'LOADING'
                return a
            }, {}))

            await Promise.all(newResult!.crawledPages.map(async crawledPage => {
                const response = await fetch(`/chat-api/ingest?namespace=${encodeURIComponent(demo?.namespaceId!)}&url=${encodeURIComponent(crawledPage.originalUrl)}`, {
                    method: 'POST',
                    body: new Blob([crawledPage.html], { type: 'text/html' }),
                    headers: {
                        "Content-Type": "text/html"
                    }
                });
                if (response.ok) {
                    updateIngestResult(crawledPage.pageName, 'OK')
                } else {
                    updateIngestResult(crawledPage.pageName, 'ERROR')
                }
            }))
            await saveDemo(demo?.namespaceId!, newResult?.indexOpenGraph || null)
            setSuccess(true);
            setNanoId(crypto.randomUUID())
            setIsChatOpen(true);
        }
        catch (error) {
            setErrorMessage("Something went wrong... try again!")
            console.error('An error occurred during the HTML upload:', error);
        }
        setLoading(false)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (success) {
            push(`/chat/${url}`)
        } else {
            await ingest()
        }
    };

    return <>
        <section className="container flex flex-col items-center z-10 overflow-hidden pb-16 md:pb-20 pt-24 lg:pt-[200px] lg:pb-28 max-w-[1280px]">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:mb-24">
                <div className="max-w-[750px] text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="mr-2">💬</span>Skräddarsy din egna AI</h1>
                    <h2 className="text-1xl md:text-3xl mb-3">Möjliggör smidiga konversationer för dina kunder<span className="md:hidden">. Låt din webbplats gå från bra till fantastisk! </span></h2>
                    <h3 className="text-1xl hidden md:block">Låt din webbplats gå från bra till fantastisk med en unik Chattbot, drivet av den senaste AI-tekniken. Ge dina kunder den bästa möjliga upplevelsen med skräddarsydda och naturliga konversationer direkt på din webbplats. Vår smarta Chattbot samlar automatiskt in information från vilken webbsida som helst och svarar omedelbart på dina kunders frågor.</h3>
                </div>
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[750px] rounded-md dark:bg-dark bg-opacity-5 px-6 mt-4 dark:bg-dark">
                            <IngestForm loading={loading} success={success} url={url} setUrl={setUrl} errorMessage={errorMessage} onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-[75px]">
                {loading ? <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div> : null}
            </div>
            {!loading && !result ? <DemoNamespaces demoNamespaces={demoNamespaces.data} loading={demoNamespaces.loading} setNanoId={setNanoId} setDemo={setDemo} /> : null}
            {result ? <ScrollOnMount><IngestResult result={result} ingestResult={ingestResult} /></ScrollOnMount> : null}
            <ChatBubbleIcon onClick={handleChatClick} isChatOpen={isChatOpen}/>
            {isChatOpen ? (
                <ChatWindow isOpen={isChatOpen} onClose={handleChatClick}>
                    {nanoId ? (
                        <ScrollOnMount><ChatBubble
                            id={nanoId}
                            namespaceTitle={demo?.domainName}
                            namespaceId={demo?.namespaceId}
                            initialMessages={[]}
                        />
                        </ScrollOnMount>
                    ) : (
                        <div className="max-w-[750px] text-center md:text-left">
                            <h1 className="text-4xl md:text-3xl font-bold mb-3"><span className="mr-2">🔥</span>Välkommen!</h1>
                            <h2 className="text-1xl md:text-2xl mb-3">Påbörja din chat genom att välja en sida att interagera med</h2>
                            <h3 className="text-1xl hidden md:block">Om du vill stå ut från mängden och signalera din innovationsförmåga kan du enkelt integrera en skräddarsydd chattbott till din egen sida. <ExternalLink href="/contact">Tryck här för att integrera din egen chattbott</ExternalLink> </h3>
                        </div>
                    )}
                </ChatWindow>
            ) : null}
            <Gradient />
        </section >
    </>
}
