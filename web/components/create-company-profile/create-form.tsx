'use client'
import { NewCompanyProfileInput } from '@/../@chat-connect-libs/contracts/dist';
import TextField from '../text-field';

interface CreateFormProps {
    success: boolean
    loading: boolean
    state: NewCompanyProfileInput,
    onChange: (key: keyof NewCompanyProfileInput, value: any) => void
    onSubmit: (event: any) => void
    errorMessage?: string
}
export function CreateForm({ success, loading, state, onChange, onSubmit, errorMessage }: CreateFormProps) {

    return <form onSubmit={onSubmit}>
        {errorMessage && (
            <div className="mb-3 text-center" style={{ color: 'red' }}>
                {errorMessage}
            </div>
        )}
        <div className="min-w-[300px] flex-col space-y-1">
            <TextField
                value={state.name}
                onChange={(event) => onChange('name', event.target.value)}
                type="text"
                name="name"
                placeholder="Företagets namn"
            />
            <TextField
                value={state.description}
                onChange={(event) => onChange('description', event.target.value)}
                type="text"
                name="description"
                placeholder="Företagsbeskrivning"
            />
            <TextField
                value={state.imageUrl}
                onChange={(event) => onChange('imageUrl', event.target.value)}
                type="text"
                name="imageUrl"
                placeholder="ImageUrl"
            />
            <TextField
                value={state.introText}
                onChange={(event) => onChange('introText', event.target.value)}
                type="text"
                name="introText"
                placeholder="Intro Text"
            />
            <TextField
                value={state.url}
                onChange={(event) => onChange('url', event.target.value)}
                type="text"
                name="url"
                placeholder="Addressen till hemsidan som ska ingestas"
            />
            <div className="mt-4 mb-6">
                <button disabled={loading || success} className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white bg-gradient-to-r from-indigo-500">
                    Skapa företaget-{'>'}
                </button>
            </div>
        </div>
    </form>
}
