import { ReactElement } from 'react'
import { Select } from '@navikt/ds-react'
import { useQueryState } from 'next-usequerystate'

function GradingSelect(): ReactElement {
    const [grading, setGrading] = useQueryState('gradering')

    return (
        <Select
            label="Gradering"
            value={grading || ''}
            onChange={(e) => setGrading(e.target.value || null)}
            size="small"
        >
            <option value="">Gradert og ikke-gradert</option>
            <option value="gradert">Gradert</option>
            <option value="ikke-gradert">Ikke-gradert</option>
        </Select>
    )
}

export default GradingSelect
