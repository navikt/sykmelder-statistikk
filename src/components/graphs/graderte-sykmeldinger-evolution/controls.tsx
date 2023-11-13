'use client'

import { ReactElement } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { LineGraphStackedIcon, TableIcon, ToggleGroup } from 'aksel-client'

import { createUrl } from '../../../utils/url'

export function Controls(): ReactElement {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = (value: string): void => {
        const newParams = new URLSearchParams(searchParams.toString())

        // Only keep value if it's not graf
        if (value !== 'graph') {
            newParams.set('view', value)
        } else {
            newParams.delete('view')
        }

        router.push(createUrl('/', newParams) as never, { scroll: false })
    }

    return (
        <div className="mb-4 ml-4">
            <ToggleGroup defaultValue={searchParams.get('view') ?? 'graph'} size="small" onChange={handleChange}>
                <ToggleGroup.Item value="graph">
                    <LineGraphStackedIcon />
                    Vis som graf
                </ToggleGroup.Item>
                <ToggleGroup.Item value="tabell">
                    <TableIcon />
                    Vis som tabell
                </ToggleGroup.Item>
            </ToggleGroup>
        </div>
    )
}
