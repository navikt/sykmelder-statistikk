'use client'

import { ReactElement, useState } from 'react'
import { Label, Button, MonthPicker } from '@navikt/ds-react'

import { formatMonthYear } from '../../utils/date'
import { useMonthYearQueryState } from '../../state-hooks/date'

type Props = {
    fromDate: Date
    toDate: Date
}

function MonthYearPicker({ fromDate, toDate }: Props): ReactElement {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useMonthYearQueryState('date')

    return (
        <div>
            <Label htmlFor="month-year-picker">Periode</Label>
            <MonthPicker
                dropdownCaption
                fromDate={fromDate}
                toDate={toDate}
                onMonthSelect={(date) => setDate(date ?? null)}
                onClose={() => setOpen(false)}
                open={open}
            >
                <Button id="month-year-picker" variant="secondary" size="small" onClick={() => setOpen((x) => !x)}>
                    {formatMonthYear(date)}
                </Button>{' '}
            </MonthPicker>
        </div>
    )
}

export default MonthYearPicker
