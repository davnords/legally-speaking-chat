import { NextResponse, NextRequest } from "next/server"
import { PineconeClient } from '@pinecone-database/pinecone';

const client = new PineconeClient();

export async function POST(request: NextRequest) {
    const source = request.nextUrl.searchParams.get("source")
    const namespace = request.nextUrl.searchParams.get("namespace")
    console.log(namespace)

    if (!namespace) {
        return NextResponse.json({ message: 'Namespace is required' }, {
            status: 400,
        })
    }

    await client.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME!);

    if (!source) {
        console.log('No source was provided, entire namespace was removed')
        await pineconeIndex.delete1({
            deleteAll: true,
            namespace: namespace,
        })
        return NextResponse.json({ message: 'successfully deleted entire namespace' }, {
            status: 200,
        })
    }

    pineconeIndex._delete({deleteRequest: {
        filter: {
            source: source,
        },
        namespace: namespace,
        deleteAll: false,
    }})

    return NextResponse.json({ message: 'successfully deleted entire namespace' }, {
        status: 200,
    })

}