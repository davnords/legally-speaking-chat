'use client'

import { useState } from 'react';
import ScrollOnMount from '../scroll-on-mount';
import ChatBubbleIcon from './icon';
import EmbeddedChatWindow from './chat-window';
import { EmbeddedChatComponent } from './chat';
import { useEffect } from 'react';
import { getNamespace, createEvent, createChatTime } from '@/lib/api-helper';

export interface EmbeddedChatProps {
    namespace: string
    namespaceObject?: NamespaceProps
    isDemo?: boolean
    forceOpen?: boolean
}

export interface NamespaceProps {
    namespace: string;
    exampleQuestions: string[];
    introText: string;
    ui?: { color: string, title: string };
    projectName?: string
}

const openStyle = {
    width: '650px',
    maxWidth: '100vw',
    height: '900px',
    maxHeight: '95vh',
}

const closedStyle = {
    width: '80px',
    height: '80px',
}

export function EmbeddedChat({ namespace, namespaceObject, isDemo, forceOpen }: EmbeddedChatProps) {
    const [nanoId, setNanoId] = useState<string | null>(null)
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [namespaceData, setNamespaceData] = useState<NamespaceProps | null>(null)
    const [chatStartTime, setChatStartTime] = useState<number | null>(null);

    const postResizeEvent = (isOpen: boolean) => {
        if (window?.parent) {
            const customEvent = `chatterFlowEvent:resize:${JSON.stringify({
                ...(isOpen ? openStyle : closedStyle),
                opacity: '1',
                display: 'block',
                position: 'fixed',
                bottom: '0px',
                right: '0px',
                border: 'none',
                'z-index': '10000',
                background: 'transparent',
                transition: 'width 200ms',
                colorScheme: 'none'
            })}`;
            window.parent.postMessage(customEvent, '*')
        } else {
            console.log("Window parent not available")
        }
    }

    // Wavh: Kanske man bara vill tracka unika öppningar? Inte bara om någon spammar den? Vet ej :D
    const handleChatClick = async () => {
        const newStatus = !isChatOpen
        postResizeEvent(newStatus)
        setIsChatOpen(newStatus);
        if (newStatus) {
            setChatStartTime(Date.now());
            await createEvent('CHAT_WINDOW_OPEN', namespace)
        } else {
            // Chat is being closed, calculate duration and create event
            if (chatStartTime) {
                const chatDurationInSeconds = Math.floor((Date.now() - chatStartTime) / 1000);
                await createChatTime(namespace, chatDurationInSeconds)
            }
        }
    };

    // Seems unecessary to have two different empty useEffects, maybe we can combine them
    useEffect(() => {
    }, []) // <-- empty dependency array (to only trigger at mounting)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getNamespace(namespace);
            setLoading(false)
            if (data) {
                setNamespaceData({ namespace: data.namespace.name, exampleQuestions: data.namespace.exampleQuestions, introText: data.namespace.introText });
            }
            setLoading(false)
        }
        const trackWebsiteVisit = async () => {
            const result = await createEvent('WEBSITE_VISIT', namespace)
        }
        const fetchNanoId = async () => {
            setNanoId(crypto.randomUUID())
        }
        setTimeout(() => {
            if (forceOpen) {
                handleChatClick()
            } else {
                postResizeEvent(false)
            }
        }, 500)
        fetchNanoId()
        trackWebsiteVisit()
        fetchData()
    }, []) // <-- empty dependency array (to only trigger at mounting)

    useEffect(() => {
    }, []) // <-- empty dependency array (to only trigger at mounting)


    return (
        <div style={isChatOpen ? openStyle : closedStyle} className={isChatOpen ? "" : "flex align-middle justify-center"}>
            {!isChatOpen ? <ChatBubbleIcon onClick={handleChatClick} isChatOpen={isChatOpen} color={namespaceObject?.ui?.color} /> : null}
            {isChatOpen ? (
                <EmbeddedChatWindow isOpen={isChatOpen} onClose={handleChatClick} color={namespaceObject?.ui?.color} title={namespaceObject?.ui?.title}>
                    {nanoId ? (
                        <ScrollOnMount><EmbeddedChatComponent
                            namespaceData={namespaceObject || null}
                            id={nanoId}
                            namespaceId={namespace}
                            initialMessages={[]}
                            isDemo={isDemo}
                        />
                        </ScrollOnMount>
                    ) : null}
                </EmbeddedChatWindow>
            ) : null}
        </div>
    )
}