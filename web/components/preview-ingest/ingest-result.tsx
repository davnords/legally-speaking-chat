'use client'

import { useRef } from 'react';
import { IngestResultStatus } from './index'
import { IngestPreviewQueryResult } from '@chat-connect-libs/contracts/dist';

interface IngestResultProps {
    result: IngestPreviewQueryResult
    ingestResult: IngestResultStatus
}

export function IngestResult({ result, ingestResult }: IngestResultProps) {
    const scrollToRef = useRef<HTMLDivElement>(null);
    /*useEffect(() => {
        scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [])*/
    const findIngestStatus = (pageName: string) => {
        const status = ingestResult[pageName]
        if (!status) {
            return 'NOT_FOUND'
        }
        return status
    }

    return <div id="result" className="container mt-10 mb-20 flex flex-col justify-center items-center max-w-[750px]">
        <h2 className="text-4xl font-bold">Fantastiskt! Vi har hittat {result.crawledPages.length} sidor på din webbplats 🔥</h2>
        <h4 className="text-1xl mt-4">I denna demo kommer vi visa dig information från {result.crawledPages.length} av dessa sidor. Låt oss sätta igång och utforska allt spännande tillsammans! 💫</h4>
        <div className="flex flex-col">{result.crawledPages.map(crawledPage =>
            <div className="flex flex-row mt-4" key={crawledPage.pageName}>
                {findIngestStatus(crawledPage.pageName) === 'LOADING' ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div> : null}
                {findIngestStatus(crawledPage.pageName) === 'OK' ? <div className="shrink-1">
                    ✅
                </div> : null}
                {findIngestStatus(crawledPage.pageName) === 'ERROR' ? 'error..' : null}
                <p ref={scrollToRef} className="ml-2 font-bold">{crawledPage.originalUrl.replace('https://' + crawledPage.domainName, '')}</p>
            </div>
        )}
        </div>
    </div>
}