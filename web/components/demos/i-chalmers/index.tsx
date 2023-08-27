'use client'

import { Company } from "../company"
import { DataArray } from "@/components/admin/data"

export function IChalmers() {
    return <>
        <Company company={DataArray[2]} />
    </>
}
