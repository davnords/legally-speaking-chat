'use client'

import { useState } from 'react';
import { CreateForm } from './create-form';
import { createNewCompanyProfile, getSitemap, } from '../../lib/api-helper';
import PageContainer from '../common/page-container';
import { NewCompanyProfileInput, NewCompanyProfileResult } from '@chat-connect-libs/contracts';
import { CompanyProfileIngest } from '../company-profile-ingest';

export type Status = { htmlResult: string | null, status: 'IDLE_SCRAPE' | 'LOADING' | 'ERROR' | 'IDLE_INGEST' | 'LOADING' | 'SUCCESS' }

export interface ResultStatus {
    [pageName: string]: Status
}

export function CreateCompanyProfile() {
    const [input, setInput] = useState<NewCompanyProfileInput>({
        description: '',
        href: '',
        imageUrl: '',
        introText: '',
        name: '',
        url: '',
        exampleQuestions: []
    })
    const [namespace, setNamespace] = useState<NewCompanyProfileResult | null>(null)
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<ResultStatus>({})
    const [sites, setSites] = useState<string[] | null>(null)

    const updateInput = (key: keyof NewCompanyProfileInput, value: any) => {
        setInput(prev => ({ ...prev, [key]: value }))
    }

    const handleInitiate = async () => {
        if (!input.url) {
            setErrorMessage('Both url and namespace is required to proceed')
            return
        }
        setErrorMessage('')
        setLoading(true);

        try {
            const namespace = await createNewCompanyProfile(input)
            setNamespace(namespace!)
            const newSites = await getSitemap({
                url: input.url
            })
            setSites(newSites?.sites || null)
            setStatus(newSites!.sites!.reduce<ResultStatus>((a, b) => {
                a[b] = { status: 'IDLE_SCRAPE', htmlResult: null }
                return a
            }, {}))
            setSuccess(true);
        }
        catch (error) {
            setErrorMessage("Something went wrong... try again!")
            console.error('An error occurred during the HTML upload:', error);
        }
        setLoading(false)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await handleInitiate()
    };

    return <>
        <PageContainer>
            <div className="w-full px-4">
                <div className="mx-auto max-w-[750px] rounded-md bg-opacity-5 px-6 mt-4">
                    <CreateForm loading={loading} success={success} state={input} onChange={updateInput} errorMessage={errorMessage} onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-[75px]">
                {loading ? <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div> : null}
            </div>
            {namespace ? <CompanyProfileIngest namespace={namespace.namespace} url={namespace.domainName} /> : null}
        </PageContainer>
    </>
}
