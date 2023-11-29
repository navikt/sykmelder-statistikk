import { ReactElement } from 'react'
import { Select } from '@navikt/ds-react'
import { useQueryState } from 'next-usequerystate'

function AllCompletedCases(): ReactElement {
    const [allCompletedCases, setAllCompletedCases] = useQueryState('alle-avsluttede')

    return (
        <Select
            label="Alle/avsluttede tilfeller"
            value={allCompletedCases || ''}
            onChange={(e) => setAllCompletedCases(e.target.value || null)}
            size="small"
        >
            <option value="">Avsluttede tilfeller</option>
            <option value="alle-statuser">Alle statuser</option>
        </Select>
    )
}

export default AllCompletedCases
