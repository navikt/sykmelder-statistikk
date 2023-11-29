import { ReactElement } from 'react'
import { Select } from '@navikt/ds-react'
import { useQueryState } from 'next-usequerystate'

function GenderSelect(): ReactElement {
    const [gender, setGender] = useQueryState('kjonn')

    return (
        <Select label="Kjønn" value={gender || ''} onChange={(e) => setGender(e.target.value || null)} size="small">
            <option value="">Begge kjønn</option>
            <option value="kvinne">Kvinne</option>
            <option value="mann">Mann</option>
        </Select>
    )
}

export default GenderSelect
