'use client'
import TextField from '../text-field';

interface ScrapeFormProps {
    loading: boolean
    url: string,
    setUrl: (url: string) => void
    onSubmit: (event: any) => void
    errorMessage?: string
}
export function ScrapeForm({ loading, url, setUrl, onSubmit, errorMessage }: ScrapeFormProps) {
    return <form onSubmit={onSubmit}>
        {errorMessage && (
            <div className="mb-3 text-center" style={{ color: 'red' }}>
                {errorMessage}
            </div>
        )}
        <div className="min-w-[300px] flex-col space-y-1">
            <TextField
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                type="text"
                name="url"
                placeholder="Addressen till hemsidan som ska ingestas"
            />
            <div className="mt-4 mb-6">
                <button disabled={loading} className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white bg-gradient-to-r from-indigo-500">
                    Scrape!! -{'>'}
                </button>
            </div>
        </div>
    </form>
}
