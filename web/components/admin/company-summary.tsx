import { CompanyProfile } from "@chat-connect-libs/contracts/dist";
import { Button } from "../ui/button";
import { useState } from "react";
import { generateNewExampleQuestions, setExampleQuestions } from "@/lib/api-helper";

interface CompanySummaryProps {
    company: CompanyProfile
}
export function CompanySummary({ company }: CompanySummaryProps) {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<{ [id: string]: string }>(company.exampleQuestions?.reduce<any>((a, b) => {
        a[b.id] = b.question
        return a
    }, {}) || {})
    const [newQuestions, setNewQuestions] = useState<{ [id: string]: string }>({ [crypto.randomUUID()]: '' })
    const [generatedExampleQuestions, setGeneratedExampleQuestions] = useState<string[]>([])
    const handleQuestionChange = (id: string, question: string) => {
        setQuestions(prev => {
            return { ...prev, [id]: question }
        })
    }
    const handleNewQuestionChange = (id: string, question: string) => {
        setNewQuestions(prev => {
            let toUpdate = prev[id]
            if (!toUpdate || !toUpdate.length) {
                return { ...prev, [id]: question, [crypto.randomUUID()]: '' }
            }
            return { ...prev, [id]: question }
        })
    }

    const handleRemoveExampleQuestion = (id: string) => {
        setNewQuestions(prev => {
            const wip = { ...prev }
            delete wip[id]
            return wip
        })
    }
    const handleRemoveQuestion = (id: string) => {
        setQuestions(prev => {
            const wip = { ...prev }
            delete wip[id]
            return wip
        })
    }

    const handleSave = async () => {
        setLoading(true)
        let questionsToSave = [
            ...Object.keys(questions).map(id => ({ id: id, question: questions[id] })),
            ...Object.keys(newQuestions).map(id => ({ id: id, question: newQuestions[id] })),
        ]
        questionsToSave = questionsToSave.filter(x => x.question)
        const savedQuestions = await setExampleQuestions({
            namespace: company.namespace,
            exampleQuestions: questionsToSave
        })
        if (savedQuestions) {
            setQuestions(savedQuestions.exampleQuestions.reduce<any>((a, b) => {
                a[b.id] = b.question
                return a
            }, {}))
            setNewQuestions({ [crypto.randomUUID()]: '' })
        }
        setLoading(false)
    }

    const handleGetExampleQuestions = async () => {
        setLoading(true)
        const newExampleQuestions = await generateNewExampleQuestions(company.namespace)
        if (newExampleQuestions?.questions) {
            setGeneratedExampleQuestions(newExampleQuestions.questions)
        }
        setLoading(false)
    }
    return <>
        <div className="p-6">
            <h2 className="text-1xl md:text-2xl mb-3">🔥 Data Summary for: {company.name}</h2>
            <div className="flex flex-row justify-between">
                <h3 className="text-l md:text-xl mb-3">Company Questions</h3>
                <Button disabled={loading} onClick={handleGetExampleQuestions}>Get Example Questions!</Button>
            </div>
            <div className="flex flex-col gap-4">
                {generatedExampleQuestions?.length ? <div className="p-4">
                    {generatedExampleQuestions.map((exampleQuestion, index) => <p key={exampleQuestion}>{exampleQuestion}</p>)}
                </div> : null}
                {Object.keys(questions)?.map((questionId, index) => <div key={questionId} className="flex flex-row items-end gap-3">
                    <CustomTextField
                        label={`Question ${index + 1}`}
                        value={questions[questionId]}
                        onChange={(event) => handleQuestionChange(questionId, event.target.value)}
                    />
                    <Button onClick={() => handleRemoveQuestion(questionId)}>Remove</Button>
                </div>)}
                {newQuestions.length}
                {Object.keys(newQuestions).map((newQuestionId, index) => <div key={newQuestionId} className="flex flex-row items-end gap-3">
                    <CustomTextField
                        key={newQuestionId}
                        label={`Question ${(company.exampleQuestions?.length || 0) + index + 1} (NEW)`}
                        value={newQuestions[newQuestionId]}
                        onChange={(event) => handleNewQuestionChange(newQuestionId, event.target.value)}
                    />
                    <Button onClick={() => handleRemoveExampleQuestion(newQuestionId)}>Remove</Button>
                </div>)}
                <Button onClick={handleSave} disabled={loading}>Save</Button>
            </div>
        </div>
    </>
}

interface CustomTextFieldProps {
    value: string | number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type?: React.HTMLInputTypeAttribute
    name?: string
    placeholder?: string
    label?: string
}
function CustomTextField({ value, onChange, type = 'text', name, placeholder, label }: CustomTextFieldProps) {
    return <div className="flex flex-col flex-1">{label ? <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-dark dark:text-white"
    >
        {label}
    </label> : null}
        <input
            value={value}
            onChange={onChange}
            type={type}
            name={name}
            placeholder={placeholder}
            className="rounded-md border border-transparent py-1 px-1 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
        />
    </div>
}
