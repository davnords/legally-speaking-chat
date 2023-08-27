import { kv } from '@vercel/kv'
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { email } = json
    console.log(email)
    const createdAt = Date.now()
    await kv.hmset(email, { createdAt })
    return NextResponse.json('success', {
        status: 200,
    })

}