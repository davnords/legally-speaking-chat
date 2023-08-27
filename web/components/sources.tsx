import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Document } from 'langchain/document'


export interface ChatResponse {
    response: [Document<Record<string, any>>[], number]
}

export async function SourcesCompent({ response }: ChatResponse) {

    return (
        <div
            className="p-5"
        >
            <Accordion
                type="single"
                collapsible
                className="flex-col"
            >
                {response.map((doc: any, index: any) => (
                    <div key={`messageSourceDocs-${index}`}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                                <h3>Source: {index + 1}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="mt-2">
                                    {doc[0].pageContent}
                                </p>
                                <p className="mt-2" style={{ fontSize: '14px' }}>
                                    <b>Source:</b> <a href='/' target="_blank" rel="noopener noreferrer" className="link" style={{ color: 'blue' }}>www.test.com</a>
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                ))}
            </Accordion>
        </div>
    )
}
