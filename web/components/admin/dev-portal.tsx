'use client'

// For documentation, see: https://primereact.org/datatable/

import { Column } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent, DataTableExpandedRows, DataTableRowEvent, DataTableValueArray } from 'primereact/datatable';
import { Toast } from 'primereact/toast';

import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import axios from 'axios'
import PageContainer from '../common/page-container';
import PageTitle from '../common/page-title';
import Link from 'next/link';
import { CompanyProfile } from '@chat-connect-libs/contracts/dist';
import { getAllCompanies } from '../../lib/api-helper';
import { useRouter } from 'next/navigation';
import TextField from '../text-field';
import { Button } from '../ui/button';
import { CompanySummary } from './company-summary';


interface NamespaceData {
    namespace: string;
    vectorCount: number;
}

export function DevPortal() {
    const [companies, setCompanies] = useState<CompanyProfile[]>([]);
    const [pineconeData, setPineconeData] = useState<NamespaceData[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
    const toast = useRef<Toast>(null); // think about incorporating a toast
    const router = useRouter()
    useEffect(() => {
        getAllCompanies().then(data => setCompanies(data?.result || []));
    }, []);

    const tableStyle = {
        background: 'var(--surface-card)',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '1rem',
    };

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    const imageBodyTemplate = (company: CompanyProfile) => {
        return <img src={company.imageUrl} alt={company.imageUrl} className="w-12 shadow-2 border-round" />;
    };

    useEffect(() => {
        async function fetchPineconeData() {
            try {
                const { data } = await axios.get('/api/namespaces');
                // Simple data restructuring
                const dataArray = Object.keys(data).map((namespace) => ({
                    namespace,
                    vectorCount: data[namespace].vectorCount,
                }));
                setPineconeData(dataArray)
            } catch (error) {
                console.error('Error fetching Pinecone data:', error);
            }
        }
        fetchPineconeData();
    }, []);

    const onRowExpand = (event: DataTableRowEvent) => {
        toast.current?.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event: DataTableRowEvent) => {
        toast.current?.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows: DataTableExpandedRows = {};

        companies.forEach((p) => (_expandedRows[`${p.namespace}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(undefined);
    };
    const header = (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={expandAll}>
                <span className="mr-2">+</span>
                Expand All
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={collapseAll}>
                <span className="mr-2">-</span>
                Collapse All
            </button>
        </div>
    );


    const rowExpansionTemplate = (company: CompanyProfile) => {
        return <CompanySummary company={company} />
    };

    return (
        <>
            <PageContainer>
                <PageTitle header='Namespace database' subHeader='Manage internal data' paragraph='' emoji='🔥' />
                <Link href="/admin/dev-portal/create">Create new namespace</Link>
                <h2 className="text-1xl md:text-2xl mb-3 pt-8">Demo Clients</h2>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:mb-24">
                    <div className="card" style={tableStyle}>
                        <DataTable value={companies} dataKey="namespace" expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                            onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                            header={header} tableStyle={{ minWidth: '50rem', textAlign: 'left' }}>
                            <Column expander={true} style={{ width: '5rem' }} />
                            <Column className="underline hover:cursor-pointer" field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                            <Column header="Image" body={imageBodyTemplate}></Column>
                            <Column field="namespace" header="Namespace" editor={(options) => textEditor(options)} style={{ width: '60%' }}></Column>
                        </DataTable>
                    </div>
                </div>
                <h2 className="text-1xl md:text-2xl mb-3">All Pinecone Namespaces</h2>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:mb-24">
                    <div className="card" style={tableStyle}>
                        <DataTable value={pineconeData} dataKey="namespace" tableStyle={{ minWidth: '50rem', textAlign: 'left' }}>
                            <Column field="namespace" header="Name" sortable></Column>
                            <Column field="vectorCount" header="Vectors" sortable></Column>
                        </DataTable>
                    </div>
                </div>
            </PageContainer>
        </>
    );
}