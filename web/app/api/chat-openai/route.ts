import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PromptTemplate } from 'langchain';
import { TiktokenModel, encodingForModel } from 'js-tiktoken'
import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid';
import { NextRequest } from 'next/server';
import { auth } from '@/auth'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: NextRequest) {
    // Extract the `messages` from the body of the request
    const json = await req.json()
    let { messages } = json
    const user = (await auth()).user
    console.log('USER', user)
    const userId = (await auth())?.user.id
    const email = (await auth())?.user.email
    const question = messages[messages.length - 1].content
    const id = json.id ?? nanoid()

    if (!userId) {
        return new Response('Unauthorized', {
            status: 401
        })
    }

    const pinecone = new PineconeClient();

    await pinecone.init({
        environment: process.env.PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
        apiKey: process.env.PINECONE_API_KEY ?? '',
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME ?? '');

    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({}),
        {
            pineconeIndex: index,
            textKey: 'text',
            namespace: 'lawline-data',
        },
    );


    const context = await vectorStore.asRetriever(5).vectorStore.similaritySearchWithScore(question, 5)

    // Build our custom context 
    let stringContext = ''
    for (const document of context) {
        stringContext = stringContext + 'Källa: ' + document[0].pageContent
    }
    let formattedPrompt = ''

    await kv.hmset(`response:${id}`, { response: context })

    // Insert custom context along with question
    const prompt = PromptTemplate.fromTemplate(`Fråga: {question} \n\n
  Här är data från diverse legala resurser: \n{context}\n\n
  Hjälpsamt svar i Markdown:" `)
    formattedPrompt = await prompt.format({
        question: question,
        context: stringContext,
    })


    if (messages[0].role !== 'system') {
        messages = [{
            role: 'system', content: `
            Du är en jurudisk AI rådgivare med hög kompetens om svenska lagar. Du ska till bästa förmåga svara på användares frågor utifrån det kontextet du ges från tidigare juridiska frågor och lagböcker. Användaren har själv inte lagt in kontextet, det är något som vi letat fram från relevanta resurser. Om du inte kan svara på frågan baserat på kontextet bör du säga att du inte kan svara. Du skall inte hitta på! Mycket av källorna är från Lawline, men du jobbar inte på Lawline. Du är en AI rådgivare för LegallySpeaking AI. Du ska ge så utförliga svar som du kan.`
        }, ...messages]
    }

    // Replace the last message (the question) with the new formatted context

    messages[messages.length - 1].content = formattedPrompt
    // Create a system prompt (stronger for the languageModel than a user prompt)
    const response = await openai.createChatCompletion({ // Ask OpenAI for a streaming chat completion given the prompt
        model: 'gpt-3.5-turbo',
        stream: true,
        messages,
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
        onCompletion: async completion => {
            console.log('Stream completed, answer: ', completion)
            const title = messages[1].content.substring(0, 100)
            const createdAt = Date.now()
            const path = `/chat/${id}`
            const payload = {
                id,
                title,
                userId,
                createdAt,
                path,
                messages: [
                    ...messages.slice(1), // Use slice(1) to exclude the first element
                    {
                        content: question,
                        role: 'user'
                    },
                    {
                        content: completion,
                        role: 'assistant'
                    }
                ]
            }
            console.log(payload)

            await kv.hmset(`chat:${id}`, payload)
            await kv.zadd(`user:chat:${userId}`, {
                score: createdAt,
                member: `chat:${id}`
            })

            await fetch(`${process.env.NEXT_PUBLIC_HOSTING_URL}/api/create-chat`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversationId: id,
                    question: question,
                    answer: completion,
                    email: email!,
                    geo: req.geo,
                })
            })
        }
    })


    // Respond with the stream
    return new StreamingTextResponse(stream)
}