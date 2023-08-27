'use client'

import { Company } from "../company"
import { DataArray } from "@/components/admin/data"

export function Castellum() {
    return <>
    <Company company={DataArray[1]}/>
    </>
}
