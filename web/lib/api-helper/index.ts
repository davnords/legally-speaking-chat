import { Data } from '@/components/admin/data'
import {
    IngestPreviewQueryResult,
    InitiateDemoCommandResult,
    LatestDemosQueryResult,
    GetSitesInput,
    GetSitesResult,
    ScrapeSiteCommandInput,
    ScrapeSiteCommandResult,
    SetExampleQuestionsInput,
    SetExampleQuestionsResult,
    GetAllCompanyProfilesResult,
    NewCompanyProfileResult,
    NewCompanyProfileInput,
    GetCompanyProfileInput,
    GetCompanyProfileResult
} from '@chat-connect-libs/contracts'
import { useEffect, useState } from 'react'
export async function initiateDemo(url: string) {
    const demo = await fetch(`/chat-api/demo/initiate?url=${url}`, {
        method: 'post',
    })

    if (demo.status === 200) {
        const data: InitiateDemoCommandResult = await demo.json()
        return data
    }
}
export async function saveDemo(namespaceId: string, indexOpenGraph: { [property: string]: string } | null) {
    const demo = await fetch(`/chat-api/demo/save`, {
        method: 'post',
        body: JSON.stringify({
            namespaceId,
            indexOpenGraph
        })
    })

    if (demo.status === 200) {
        return true
    }
}
export async function getIngestPreview(url: string, namespaceId: string) {
    const ingestResponse = await fetch(`/scraper-api/ingest-preview?url=${url}&namespaceId=${namespaceId}`, {
        method: 'post',
    })

    if (ingestResponse.status === 200) {
        const data: IngestPreviewQueryResult = await ingestResponse.json()
        return data
    }
}
export async function getDemoNamespaces() {
    const latestDemos = await fetch(`/chat-api/demo/latest`, {
        method: 'get',
    })

    if (latestDemos.status === 200) {
        const data: LatestDemosQueryResult[] = await latestDemos.json()

        return data
    }
    return []
}

export function useDemoNamespaces() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<LatestDemosQueryResult[] | null>(null)
    useEffect(() => {
        async function fetchDemo() {
            const res = await getDemoNamespaces()
            setData(res)
            setLoading(false)
        }
        fetchDemo()
    }, [])
    return {
        loading, data
    }
}

export async function getStaticExampleQuestions(namespaceId: string) {
    const data = await Data.getProducts()
    const element = data.find((element) => element.namespace === namespaceId);
    return element?.exampleQuestions
}

export async function getIntroText(namespaceId: string) {
    const data = await Data.getProducts()
    const element = data.find((element) => element.namespace === namespaceId);
    return element?.introText
}


export async function scrapeSite(input: ScrapeSiteCommandInput) {
    const ingestResponse = await fetch(`/scraper-api/scrape-site?siteUrl=${input.siteUrl}`, {
        method: 'post',
    })

    if (ingestResponse.status === 200) {
        const data: ScrapeSiteCommandResult = await ingestResponse.json()
        console.log(data)
        return data
    }
}
export async function getSitemap(input: GetSitesInput) {
    const ingestResponse = await fetch(`/scraper-api/get-sites?url=${input.url}`, {
        method: 'get',
    })

    if (ingestResponse.status === 200) {
        const data: GetSitesResult = await ingestResponse.json()
        return data
    }
}

export async function generateNewExampleQuestions(namespaceId: string) {
    const numQuestions = 5
    const questionResponse = await fetch(`/api/chat/questions?numQuestions=${numQuestions}&namespaceId=${encodeURIComponent(namespaceId)}`, {
        method: 'get',
    })

    if (questionResponse.status === 200) {
        const data: { questions: string[] } = await questionResponse.json()
        return data
    }
}

export async function setExampleQuestions(input: SetExampleQuestionsInput): Promise<SetExampleQuestionsResult | null> {
    const questionResponse = await fetch(`/chat-api/companies/set-example-questions`, {
        method: 'POST',
        body: JSON.stringify(input)
    })

    if (questionResponse.status === 200) {
        const data: SetExampleQuestionsResult = await questionResponse.json()
        return data
    }
    return null
}

export async function createNewCompanyProfile(input: NewCompanyProfileInput) {
    const namespace = await fetch(`/chat-api/companies/initiate`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })

    if (namespace.status === 200) {
        const data: NewCompanyProfileResult = await namespace.json()
        return data
    }
}

export async function getAllCompanies() {
    const companies = await fetch(`/chat-api/companies`, {
        method: 'get',
    })

    if (companies.status === 200) {
        const data: GetAllCompanyProfilesResult = await companies.json()
        return data
    }
}
export async function getCompanyProfile(input: GetCompanyProfileInput): Promise<GetCompanyProfileResult | null> {
    const companies = await fetch(`/chat-api/companies/profile?namespace=${encodeURIComponent(input.namespace)}`, {
        method: 'get',
    })

    if (companies.status === 200) {
        const data: GetCompanyProfileResult = await companies.json()
        return data
    }
    return null
}

export async function getNamespace(namespace: string) {
    const apiresponse = await fetch(`/developer-portal/api/portal/get-namespace?namespace=${namespace}`, {
        method: 'get',
    })
    if (apiresponse.status === 200) {
        const data: { namespace: { introText: string, name: string, exampleQuestions: string[] } } = await apiresponse.json()
        return data
    }
}

export async function createEvent(type: any, namespaceName: string) {
    const event = await fetch(`/developer-portal/api/events/create-event`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ namespaceName: namespaceName, type: type })
    })

    if (event.status === 200) {
        const data = await event.json()
        return data
    }
}

export async function createChatTime(namespaceName: string, duration: number) {
    const event = await fetch(`/developer-portal/api/events/create-chat-time-event`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ namespaceName: namespaceName, duration: duration })
    })

    if (event.status === 200) {
        const data = await event.json()
        return data
    }
}