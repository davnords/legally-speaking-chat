import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/browser-chat'

export const runtime = 'edge'

export default function BrowserChatPage() {
  const id = nanoid()
  return <Chat id={id}/>
}