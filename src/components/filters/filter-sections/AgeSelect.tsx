import { Select } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { useQueryState } from 'next-usequerystate'

function AgeSelect(): ReactElement {
    const ageGroups = [
        {
            value: 'Under 25 år',
            query: 'under-25',
        },
        {
            value: 'fra 25 år - 34 år',
            query: '25-34',
        },
        {
            value: 'fra 35 - 49 år',
            query: '35-49',
        },
        {
            value: '50 år og over',
            query: '50-og-over',
        },
    ]
    const [ageGroup, setAgeGroups] = useQueryState('alder')

    return (
        <Select
            label="Alder"
            value={ageGroup || ''}
            onChange={(e) => setAgeGroups(e.target.value || null)}
            size="small"
        >
            <option value="">Alle aldre</option>
            {ageGroups.map((group) => (
                <option key={group.query} value={group.query}>
                    {group.value}
                </option>
            ))}
        </Select>
    )
}

export default AgeSelect
