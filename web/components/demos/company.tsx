'use client'

import Gradient from '@/components/ui/gradient';
import { CompanyProfile } from "@/../@chat-connect-libs/contracts/dist"
import { BubblePage } from './chat-bubble';
import PageContainer from '../common/page-container';
import PageTitle from '../common/page-title';
import { ExternalLink } from '../external-link';

export interface CompanyProps {
    company: any | null
}

export function Company({ company }: CompanyProps) {
    return <>
        <PageContainer>
            <div className="flex flex-col lg:flex-col justify-center items-center lg:mb-24">
                <PageTitle header={`Demo för: ${company?.title}`} emoji='✨' subHeader='Vi har sammanställt några utvalda företag som du kan chatta med.' paragraph='För din egen hemsida kan du få vår tjänst skräddarsydd till dina behov.' />
                <h3 className="text-1xl hidden md:block pt-5"><ExternalLink href="/contact">Kontakta oss.</ExternalLink></h3>
            </div>
            {company?.imageUrl ? <img className="rounded-t object-cover max-h-[30vw] h-48 w-96 max-w-[60vw] lg:max-w-[384px]" alt={company.title} src={company.imageUrl} /> :
                <div className="min-w-max max-h-[30vw] h-48 w-96 max-w-[70vw]"></div>}
            <BubblePage company={company} />
            <Gradient />
        </PageContainer>
    </>
}
