'use client'

import { LatestDemosQueryResult } from "@/../@chat-connect-libs/contracts/dist"
import { InitiateDemoCommandResult } from '@/../@chat-connect-libs/contracts/dist';

interface DemoNamespacesProps {
    loading: boolean
    setNanoId: React.Dispatch<React.SetStateAction<string | null>>;
    setDemo: React.Dispatch<React.SetStateAction<InitiateDemoCommandResult | null>>;
    demoNamespaces: LatestDemosQueryResult[] | null
}
export function DemoNamespaces({ demoNamespaces, loading, setNanoId, setDemo }: DemoNamespacesProps) {
    return <div style={{ opacity: demoNamespaces?.length ? 1 : 0 }} className="flex flex-row gap-3 md:gap-10 overflow-x-auto w-full ">{demoNamespaces?.map(namespace =>
        <div key={namespace.namespaceId} className="w-96 max-w-[70vw] lg:max-w-[50rem] overflow:hidden rounded shadow-lg bg-gradient-to-r from-indigo-500">

            {namespace.imageUrl ? <img className="rounded-t object-cover max-h-[30vw] h-48 w-96 max-w-[60vw] lg:max-w-[384px]" alt={namespace.title} src={namespace.imageUrl} /> :
                <div className="min-w-max max-h-[30vw] h-48 w-96 max-w-[70vw]"></div>}
            <div className="px-6 py-4">
                <a
                    className="font-bold md:text-xl mb-1"
                    href={
                        namespace.url.startsWith('http://') || namespace.url.startsWith('https://')
                            ? namespace.url // If the URL starts with 'http://' or 'https://', use it as is
                            : `https://www.${namespace.url}` // Otherwise, prepend 'https://www.'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {namespace.url}
                </a>
                <p className="hidden md:block text-base">
                    {namespace.title}
                </p>
                <div className="font-bold md:text-base mb-1"><button onClick={() => {
                    setNanoId(crypto.randomUUID())
                    setDemo({
                        namespaceId: namespace.namespaceId,
                        domainName: namespace.domainName,
                    })
                }}>Chat with this website</button></div>
            </div>
        </div>)}
    </div>
}
