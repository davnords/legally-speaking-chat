import { NextResponse, NextRequest } from "next/server"
import fs from 'fs';
import os from 'os'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter"

const client = new PineconeClient();

export async function POST(request: NextRequest) {
    const name = request.nextUrl.searchParams.get("name")
    const customerId = request.nextUrl.searchParams.get("id") 
    const securityLevel = request.nextUrl.searchParams.get("security") 
    const namespace = request.nextUrl.searchParams.get("namespace")
    const stream = await request.body; // ReadableStream
    const chunks = [];

    if (!name || !namespace) {
        return NextResponse.json({ message: 'File name and namespace are required' }, {
            status: 400,
        })
    }

    // Read the stream and accumulate chunks in an array
    if (!stream){
        return NextResponse.json({ message: 'File not uploaded correctly' }, {
            status: 400,
        }) 
    }

    const reader = stream.getReader();
    let done = false;

    while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (readerDone) {
            done = true;
        } else {
            chunks.push(value);
        }
    }

    // Concatenate the chunks to create a Buffer
    const buffer = Buffer.concat(chunks);

    // get file extension
    const fileExtension = name.substring(name.lastIndexOf('.') + 1);

    // Hyperparameters (can be included in API call)
    const chunkSize = 1000;
    const chunkOverlap = 0;

    const tempFilePath = await createTempFile(buffer)
    var loader = null
    switch (fileExtension) {
        case 'pdf':
            loader = new PDFLoader(tempFilePath);
            break;
        case 'docx':
            loader = new DocxLoader(tempFilePath);
            break;
        case 'txt':
            loader = new TextLoader(tempFilePath);
            break;
        default:
            return NextResponse.json({ message: 'Unrecognized file-type' }, {
                status: 400,
            })
    }

    let documents = await loader.load();

    const metadata = {
        name,
        source: name,
        date: new Date().toISOString(),
        id: customerId!,
        securityLevel: securityLevel!,
    }

    documents = documents.map(document => ({
        ...document,
        metadata
    }))

    const textSplitter = new CharacterTextSplitter({ chunkSize, chunkOverlap });
    let docs = await textSplitter.splitDocuments(documents);
    docs = docs.filter(x => x.pageContent.split(' ').length > 3)
    
    await client.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME!);
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY
    }), {
        pineconeIndex,
        namespace
    });

    console.log('File uploaded from source:', name)
    return NextResponse.json({ message: 'successfully uploaded file' }, {
        status: 200,
    })
}

// TODO: Move this as a utils functions in a shared directory
// TODO: Should not always end in .html huh
// Credit WAVH, source: https://github.com/nordesen-technologies/chat-connect-technologies/blob/main/packages/chat-api-node/functions/ingest/index.ts
async function createTempFile(data: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      // Using the fs module to create a temporary file
      fs.mkdtemp(os.tmpdir() + "/", (err, folder) => {
        if (err) reject(err);
        const tempFilePath = folder + "/tempfile.html";
        fs.writeFile(tempFilePath, data, (err) => {
          if (err) reject(err);
          resolve(tempFilePath);
        });
      });
    });
  }