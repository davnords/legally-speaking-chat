import { StreamingTextResponse, LangChainStream } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PineconeClient } from '@pinecone-database/pinecone';
import { NextRequest } from "next/server"
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { nanoid } from '@/lib/utils'
import { kv } from '@vercel/kv'
import { auth } from '@/auth'

// Possibly we should remove chat history and source functionality or make it optional 
export const runtime = 'edge'

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { messages, customerId } = json
    const userId = (await auth())?.user.id
    const question = messages[messages.length - 1].content

    if (!userId) {
        return new Response('Unauthorized', {
            status: 401
        })
    }

    const { stream, handlers } = LangChainStream({
        onCompletion: async completion => {
            console.log('Stream completed, answer: ', completion)
            const id = json.id ?? nanoid()

            // Saving the sources
            const response = await vectorStore.asRetriever(5).vectorStore.similaritySearchWithScore(question, 5);
            await kv.hmset(`response:${id}`, { response })
            console.log('Sources successfully saved')


            const title = json.messages[0].content.substring(0, 100)
            const createdAt = Date.now()
            const path = `/chat/${id}`
            const payload = {
                id,
                title,
                userId,
                createdAt,
                path,
                messages: [
                    ...messages,
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
        },
    })

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

    const llm = new ChatOpenAI({
        streaming: true,
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-3.5-turbo',
    })

    const chain = ConversationalRetrievalQAChain.fromLLM(
        llm,
        vectorStore.asRetriever(3, { id: customerId }), //The number of source documents returned is 4 by default
        {
            qaTemplate: "Du är en jurudisk AI rådgivare med hög kompetens om svenska lagar. Du ska till bästa förmåga svara på användares frågor utifrån det kontextet du ges från tidigare juridiska frågor och lagböcker. Om du inte kan svara på frågan baserat på kontextet bör du säga att du inte kan svara. Du skall inte hitta på! Mycket av källorna är från Lawline, men du jobbar inte på Lawline. Du är en AI rådgivare för LegallySpeaking AI. Här är information du kan basera ditt svar på: \n\n{context}\n\Fråga: {question}\Hjälpsamt svar i Markdown:",
            questionGeneratorTemplate: "Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.\n\nChat History:\n{chat_history}\nFollow Up Input: {question}\nStandalone question:",
            returnSourceDocuments: true,
        },
    );

    chain
        .call(
            { question: question, chat_history: [] },
            [handlers],
        )
        .catch(console.error)

    return new StreamingTextResponse(stream)
}