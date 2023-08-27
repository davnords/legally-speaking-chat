import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/browser-chat'
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getChat } from '@/app/actions'
import { NamespaceProps } from '@/components/embedded-chat'


export const runtime = 'edge'

// Add id as parameter here also
export interface ChatPageProps {
    params: {
        namespace: string,
        id: string,
    }
}

export async function generateMetadata({
    params
}: ChatPageProps): Promise<Metadata> {
    const session = await auth()

    if (!session?.user) {
        return {}
    }

    const chat = await getChat(params.id, session.user.id)
    return {
        title: chat?.title.toString().slice(0, 50) ?? 'Chat'
    }
}


export default async function BrowserChatPageHistory({ params }: ChatPageProps) {

    const session = await auth()

    if (!session?.user) {
        //redirect(`/sign-in?next=/chat/${params.id}`)
    }

    const chat = await getChat(params.id, session.user.id)

    if (!chat) {
        notFound()
    }

    if (chat?.userId !== session?.user?.id) {
        notFound()
    }


    return <Chat id={chat.id} initialMessages={chat.messages} />
}
