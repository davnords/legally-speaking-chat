'use client'

import { Company } from "../company"
import { DataArray } from "@/components/admin/data"

export function AreTravel() {
    return <>
    <Company company={DataArray[3]}/>
    </>
}
