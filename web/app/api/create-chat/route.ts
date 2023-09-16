import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { conversationId, question, answer, email, geo } = json

    const message = await prisma.message.create({
        data: {
            conversationId: conversationId,
            question: question,
            answer: answer,
            date: new Date(),
            email: email!,
            city: geo.city,
            country: geo.country,
            region: geo.region,
            latitude: geo.latitude,
            longitude: geo.longitude,
        }
    })

    return NextResponse.json({ message: 'Successfully created message' }, {
        status: 200,
    })

}