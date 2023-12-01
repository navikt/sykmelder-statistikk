import { ReactElement, useState } from 'react'
import { LineGraphStackedIcon, TableIcon } from '@navikt/aksel-icons'
import { ToggleGroup } from '@navikt/ds-react'

type Options = 'graph' | 'table'
type UseGraphToggleGroupState = [value: Options, onChange: (value: Options) => void]

export function useGraphToggleGroupState(): UseGraphToggleGroupState {
    const [view, setView] = useState<Options>('graph')

    const handleChange = (value: Options): void => {
        setView(value)
    }

    return [view, handleChange]
}

type Props = {
    value: UseGraphToggleGroupState[0]
    onChange: UseGraphToggleGroupState[1]
}

function GraphToggleGroup({ value, onChange }: Props): ReactElement {
    return (
        <ToggleGroup className="mb-4" value={value} size="small" onChange={onChange as (value: string) => void}>
            <ToggleGroup.Item value={'graph' satisfies Options}>
                <LineGraphStackedIcon />
                Vis som graf
            </ToggleGroup.Item>
            <ToggleGroup.Item value={'table' satisfies Options}>
                <TableIcon />
                Vis som tabell
            </ToggleGroup.Item>
        </ToggleGroup>
    )
}

export default GraphToggleGroup
