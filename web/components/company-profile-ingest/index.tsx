'use client'

import { useEffect, useState } from 'react';
import { ScrapeForm } from './scrape-form';
import { getSitemap, scrapeSite } from '../../lib/api-helper/index';
import { Button } from '../ui/button';

export type Status = { htmlResult: string | null, status: 'IDLE_SCRAPE' | 'LOADING' | 'ERROR' | 'IDLE_INGEST' | 'LOADING' | 'SUCCESS' }

export interface ResultStatus {
    [pageName: string]: Status
}

interface CompanyProfileIngestProps {
    namespace: string
    url: string | null
}
export function CompanyProfileIngest({ namespace, url: urlInput }: CompanyProfileIngestProps) {
    const [url, setUrl] = useState(urlInput || '')
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<ResultStatus>({})
    const [sites, setSites] = useState<string[] | null>(null)
    const [scrapedAll, setScrapedAll] = useState(false)

    async function getSitemaps() {
        setLoading(true)
        const newSites = await getSitemap({
            url
        })
        setSites(newSites?.sites || null)
        setStatus(newSites!.sites!.reduce<ResultStatus>((a, b) => {
            a[b] = { status: 'IDLE_SCRAPE', htmlResult: null }
            return a
        }, {}))
        setLoading(false)
    }
    useEffect(() => {
        if (url) {
            getSitemaps()
        }
    }, [])
    const updateResultStatus = (pageName: string, status: Status) => {
        setStatus(prev => ({ ...prev, [pageName]: status }))
    }

    const handleScrape = async (siteUrl: string) => {
        updateResultStatus(siteUrl, {
            status: 'LOADING',
            htmlResult: null
        })
        const siteScrapeResult = await scrapeSite({ siteUrl })
        console.log(siteScrapeResult)
        if (siteScrapeResult?.result) {
            updateResultStatus(siteUrl, {
                status: 'IDLE_INGEST',
                htmlResult: siteScrapeResult.result.text
            })
        } else {
            updateResultStatus(siteUrl, {
                status: 'ERROR',
                htmlResult: null
            })
        }
    }

    const handleIngestAll = async () => {
        if (sites) {
            await Promise.all(sites?.map(site => handleIngest(site)))
        }
    }
    const handleScrapeAll = async () => {
        if (sites) {
            for (const site of sites) {
                await handleScrape(site)
            }
            //await Promise.all(sites?.map(site => handleScrape(site)))
            setScrapedAll(true)
        }
    }
    const handleIngest = async (siteUrl: string) => {
        const htmlResult = status[siteUrl].htmlResult
        if (!htmlResult) {
            alert("No html could be found for this page")
            return
        }
        updateResultStatus(siteUrl, {
            status: 'LOADING',
            htmlResult
        })
        const response = await fetch(`/chat-api/ingest?namespaceId=${encodeURIComponent(namespace!)}&url=${encodeURIComponent(siteUrl)}`, {
            method: 'POST',
            body: new Blob([htmlResult], { type: 'text' }),
            headers: {
                "Content-Type": "text"
            }
        });
        if (response.ok) {
            updateResultStatus(siteUrl, {
                status: 'SUCCESS',
                htmlResult
            })
        } else {
            updateResultStatus(siteUrl, {
                status: 'ERROR',
                htmlResult
            })
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await getSitemaps()
    };

    return <>
        {!urlInput ? <div className="w-full px-4">
            <div className="mx-auto max-w-[750px] rounded-md bg-opacity-5 px-6 mt-4">
                <ScrapeForm loading={loading} url={url} setUrl={setUrl} errorMessage={errorMessage} onSubmit={handleSubmit} />
            </div>
        </div> : null}
        <div className="flex flex-col justify-center items-center h-[75px]">
            {loading ? <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div> : null}
        </div>
        {!sites?.length ? null : scrapedAll ? <Button onClick={handleIngestAll}>Ingest ALL</Button> : <Button onClick={handleScrapeAll}>Scrape ALL</Button>}
        <div className="flex-col justify-end">
            {sites?.map(site => <div className="flex-row" key={site}>
                {status[site].status}
                {status[site].status === 'IDLE_SCRAPE' ? <Button className="ml-4 mr-4" onClick={() => handleScrape(site)}>Scrape</Button> : null}
                {status[site].status === 'IDLE_INGEST' ? <Button className="ml-4 mr-4" onClick={() => handleIngest(site)}>Ingest</Button> : null}
                {status[site].status === 'LOADING' ? <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-primary"></div> : null}
                {site}
            </div>)}
        </div>
    </>
}
