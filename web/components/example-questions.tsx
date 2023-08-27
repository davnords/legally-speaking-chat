import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

interface ExampleQuestionsProps {
    loading: boolean
    setInput: UseChatHelpers['setInput'],
    questions: string[] | null;
}

export function ExampleQuestions({ loading, setInput, questions }: ExampleQuestionsProps) {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8">
                <h1 className="mb-2 text-lg font-semibold">
                    Ställ vilken fråga du vill!
                </h1>
                <p className="mb-2 leading-normal text-muted-foreground">
                    Här är några exempel som du kan testa för att komma igång:
                </p>
                {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div> :
                    <div className="mt-4 flex flex-col items-start space-y-2">
                        {questions?.map((question, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="h-auto p-0 text-base"
                                onClick={() => setInput(question)}
                            >
                                <IconArrowRight className="mr-2 text-muted-foreground" />
                                {question}
                            </Button>
                        ))}
                    </div>}
            </div>
        </div>
    )
}
