'use client'
import TextField from '../text-field';

interface IngestFormProps {
    success: boolean
    loading: boolean
    url: string
    setUrl: (newUrl: string) => void
    onSubmit: (event: any) => void
    errorMessage?: string
}
export function IngestForm({ success, loading, url, setUrl, onSubmit, errorMessage }: IngestFormProps) {

    return <form onSubmit={onSubmit}>
        {errorMessage && (
            <div className="mb-3 text-center" style={{ color: 'red' }}>
                {errorMessage}
            </div>
        )}
        <div className="min-w-[300px]">
            <TextField
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                type="text"
                name="url"
                placeholder="Skriv addressen till din hemsida..."
            />
            <div className="mt-4 mb-6">
                <button disabled={loading} className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white bg-gradient-to-r from-indigo-500">
                    Upplev din egna Chatbot -{'>'}
                </button>
            </div>

        </div>
    </form>
}
