// Endpoint to get classification if question was answered or not

import { NextResponse, NextRequest } from "next/server"
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from "langchain/prompts";
import prompts from '@/lib/prompts.json'

export async function GET(request: NextRequest) {
    // This should be body parameters (but those are readable streams here so I did not bother)
    const question = request.nextUrl.searchParams.get("question")
    const answer = request.nextUrl.searchParams.get("answer")

    if (!question || !answer) {
        return NextResponse.json({ message: 'Question and answer are required' }, {
            status: 400,
        })
    }

    // Can be changed to suit our needs, currently returns 0 (for no answer) and 1 (for answered)
    const prompt = PromptTemplate.fromTemplate(prompts['classifyQuestion']) // possibly add input variables

    const llm = new ChatOpenAI({
        streaming: false,
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: process.env.MODEL_NAME,
    })

    const chain = new LLMChain({ llm: llm, prompt })
    const response = await chain.call({ question: question, answer: answer })

    return NextResponse.json({ response }, {
        status: 200,
    })

}