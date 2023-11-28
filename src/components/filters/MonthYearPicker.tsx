'use client'

import { ReactElement, useState } from 'react'
import { sub } from 'date-fns'
import { Label, Button, MonthPicker } from '@navikt/ds-react'

import { formatMonthYear } from '../../utils/date'
import { useMonthYear } from '../../state-hooks/date'

function MonthYearPicker(): ReactElement {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useMonthYear('date')

    return (
        <div>
            <Label htmlFor="month-year-picker">Periode</Label>
            <MonthPicker
                dropdownCaption
                fromDate={new Date('1 Oct 2020')}
                toDate={sub(new Date(), { months: 1 })}
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
