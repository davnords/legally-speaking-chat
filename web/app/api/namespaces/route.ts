import { NextResponse, NextRequest } from "next/server"
import { PineconeClient } from '@pinecone-database/pinecone';

const client = new PineconeClient();

export async function GET(request: NextRequest) {

    await client.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME!);
    const response = await pineconeIndex.describeIndexStats({
        describeIndexStatsRequest: {
            filter: {}
        },
    })

    return NextResponse.json(response.namespaces, {
        status: 200,
    })

}