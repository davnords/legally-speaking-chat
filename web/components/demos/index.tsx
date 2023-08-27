'use client'

import Gradient from '@/components/ui/gradient';
import { CompanyList } from './company-list';
import { ExternalLink } from '../external-link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Data, DataArray } from '../admin/data';
import { useEffect, useState } from 'react';

export function Demos() {
    return <>
        <section className="container flex flex-col items-center z-10 overflow-hidden pb-16 md:pb-20 pt-24 lg:pt-[200px] lg:pb-28 max-w-[1280px]">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:mb-24">
                <div className="max-w-[750px] text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="mr-2">✨</span>Utforska våra demos</h1>
                    <h2 className="text-1xl md:text-3xl mb-3">Vi har sammanställt några utvalda företag som du kan chatta med.</h2>
                    <h3 className="text-1xl hidden md:block">För din egen hemsida kan du få vår tjänst skräddarsydd till dina behov. Tveka inte att kontakta oss genom att besöka </h3>
                </div>
            </div>
            <CompanyList companies={DataArray} />
            <Gradient />
        </section >
    </>
}
