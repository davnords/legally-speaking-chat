'use client'

import { useMemo, useState } from 'react';
import Gradient from '@/components/ui/gradient';
import ScrollOnMount from '../scroll-on-mount';
import ChatBubbleIcon from '../chat-bubble/icon';
import ChatWindow from '../chat-bubble/chat-window';
import { ChatBubble } from '../chat-bubble/chat';
import { CompanyProps } from './company';
import { EmbeddedChat } from '../embedded-chat';

export type LoadingStatus = 'LOADING' | 'OK' | 'ERROR'

export interface IngestResultStatus {
    [pageName: string]: LoadingStatus
}


export function BubblePage({ company }: CompanyProps) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const handleChatClick = () => {
        setIsChatOpen(!isChatOpen);
    };
    const id = useMemo(() => {
        return crypto.randomUUID()
    }, [])
    return <>
        <EmbeddedChat namespace={company.namespace} />
        <Gradient />
    </>
}
