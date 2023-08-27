'use client'

interface CompanyListProps {
    companies: any[] | null
}
export function CompanyList({ companies }: CompanyListProps) {
    return <div style={{ opacity: companies?.length ? 1 : 0 }} className="flex flex-row gap-3 md:gap-10 overflow-x-auto w-full ">{companies?.map(company =>
        <div key={company.namespace} className="w-96 max-w-[70vw] lg:max-w-[50rem] overflow:hidden rounded shadow-lg bg-gradient-to-r from-indigo-500">
            {company.imageUrl ? <img className="rounded-t object-cover max-h-[30vw] h-48 w-96 max-w-[60vw] lg:max-w-[384px]" alt={company.name} src={company.imageUrl} /> :
                <div className="min-w-max max-h-[30vw] h-48 w-96 max-w-[70vw]"></div>}
            <div className="px-6 py-4">
                <p className="hidden md:block text-base">
                    {company.name}
                </p>
                <div className="font-bold md:text-base mb-1"><a href={company.href}>Chat with this website</a></div>
            </div>
        </div>)}
    </div>
}
