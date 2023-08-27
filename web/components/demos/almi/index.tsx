'use client'

import { Company } from "../company"
import { DataArray } from "@/components/admin/data"

export function Almi() {
    return <>
    <Company company={DataArray[0]}/>
    </>
}
