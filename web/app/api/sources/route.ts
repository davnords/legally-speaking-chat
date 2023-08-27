import { NextResponse, NextRequest } from "next/server"
import { kv } from '@vercel/kv'

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    const response = await kv.hgetall(`response:${id}`)
    return NextResponse.json({ response }, {
        status: 200,
    })
}