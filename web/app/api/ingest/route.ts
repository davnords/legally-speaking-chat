import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    const website = request.nextUrl.searchParams.get("url")
    const namespace = request.nextUrl.searchParams.get("namespace")
if (!website || !namespace) {
        return NextResponse.json({ message: 'Url and namespace is required' }, {
            status: 400,
        })
    }
    const response = await fetch(process.env.SCRAPER_API_INGEST_PREVIEW_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            website
        })
    })
    if (response.status !== 200) {
        return NextResponse.json({ message: 'Something went wrong' }, {
            status: 400,
        })
    }

    const data = await response.json()


    return NextResponse.json({ data }, {
        status: 200,
    })
}