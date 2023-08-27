'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IngestForm } from './ingest-form';
import { IngestResult } from './ingest-result';
import ScrollOnMount from '../scroll-on-mount';
import { Chat } from '../chat';
import { getIngestPreview, initiateDemo, saveDemo, useDemoNamespaces } from '../../lib/api-helper/index';
import { IngestPreviewQueryResult, InitiateDemoCommandResult } from '@/../@chat-connect-libs/contracts/dist';
import PageTitle from '../common/page-title';
import PageContainer from '../common/page-container';
import { DataArray } from '../admin/data';
import { CompanyList } from '../demos/company-list';

export type LoadingStatus = 'LOADING' | 'OK' | 'ERROR'

export interface IngestResultStatus {
    [pageName: string]: LoadingStatus
}

export function PreviewIngest() {
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
                const response = await fetch(`/chat-api/ingest?namespaceId=${encodeURIComponent(demo?.namespaceId!)}&url=${encodeURIComponent(crawledPage.originalUrl)}`, {
                    method: 'POST',
                    body: new Blob([crawledPage.text], { type: 'text' }),
                    headers: {
                        "Content-Type": "text"
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
        <PageContainer>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:mb-24">
                <PageTitle header='Skräddarsy din egna AI' emoji='💬' subHeader='Möjliggör smidiga konversationer för dina kunder' hidden='. Låt din webbplats gå från bra till fantastisk! ' paragraph='Låt din webbplats gå från bra till fantastisk med en unik Chattbot, drivet av den senaste AI-tekniken. Ge dina kunder den bästa möjliga upplevelsen med skräddarsydda och naturliga konversationer direkt på din webbplats. Vår smarta Chattbot samlar automatiskt in information från vilken webbsida som helst och svarar omedelbart på dina kunders frågor.' />
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
            {result ? <ScrollOnMount><IngestResult result={result} ingestResult={ingestResult} /></ScrollOnMount> : null}
            {nanoId ? <div className="max-w-[750px]">
                <ScrollOnMount><Chat
                    id={nanoId}
                    namespaceTitle={demo?.domainName}
                    namespaceId={demo?.namespaceId}
                    initialMessages={[]}
                />
                </ScrollOnMount>
            </div> : null}
            <CompanyList companies={DataArray} />
        </PageContainer>
    </>
}
