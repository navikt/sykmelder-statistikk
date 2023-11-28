'use client'

import { ReactElement, useRef, useState } from 'react'
import { isAfter, isBefore, setQuarter, setYear, startOfMonth, startOfYear } from 'date-fns'
import { Label, Button, Popover, Select } from '@navikt/ds-react'
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons'
import { labelNextYear, labelPrevYear } from '@navikt/ds-react/esm/date/utils'
import { range } from 'remeda'

import { cn } from 'utils/tw'
import { formatQuarter, formatYear, setYearQuarter } from 'utils/date'

import { useQuarterQueryState } from '../../state-hooks/date'

type Props = {
    fromQuarter: {
        year: number
        quarter: 1 | 2 | 3 | 4
    }
    toQuarter: {
        year: number
        quarter: 1 | 2 | 3 | 4
    }
}

function QuarterPicker({ fromQuarter, toQuarter }: Props): ReactElement {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)
    const [date, setDate] = useQuarterQueryState('quarter')

    const startOfThisMonth = startOfMonth(new Date())
    const fromDate = setYearQuarter(startOfThisMonth, fromQuarter.year, fromQuarter.quarter)
    const toDate = setYearQuarter(startOfThisMonth, toQuarter.year, toQuarter.quarter)

    return (
        <div>
            <Label htmlFor="month-year-picker">Periode</Label>
            <div ref={wrapperRef} className="navds-date__wrapper">
                <Button id="month-year-picker" variant="secondary" size="small" onClick={() => setOpen((b) => !b)}>
                    {formatQuarter(date)}
                </Button>
                <Popover
                    arrow={false}
                    anchorEl={wrapperRef.current}
                    open={open}
                    onClose={() => setOpen(false)}
                    placement="bottom-start"
                    role="dialog"
                    className={cn('navds-popover navds-date__popover navds-date flex-col gap-5', {
                        flex: open && wrapperRef.current,
                        'navds-popover--hidden': !open || !wrapperRef.current,
                    })}
                    flip={false}
                >
                    <YearSelect
                        fromDate={fromDate}
                        toDate={toDate}
                        year={date}
                        onYearChange={(year) => {
                            setDate((y) => setYear(y, year.getFullYear()))
                        }}
                    />
                    <div className="grid grid-cols-2 gap-1">
                        {range(1, 5).map((q) => {
                            const thisQuarter = setYearQuarter(startOfMonth(new Date()), date.getFullYear(), q)
                            const beforeFrom = isBefore(thisQuarter, fromDate)
                            const afterTo = isAfter(thisQuarter, toDate)
                            const disabled = beforeFrom || afterTo

                            return (
                                <button
                                    key={q}
                                    className={cn('navds-date__month-button w-auto', {
                                        'cursor-not-allowed bg-surface-neutral-subtle text-text-subtle line-through':
                                            disabled,
                                    })}
                                    disabled={disabled}
                                    onClick={() => {
                                        setDate((d) => setQuarter(d, q))
                                        setOpen(false)
                                    }}
                                >
                                    {q}. kvartal
                                </button>
                            )
                        })}
                    </div>
                </Popover>
            </div>
        </div>
    )
}

type YearSelectProps = {
    year: Date
    fromDate: Date
    toDate: Date
    onYearChange: (year: Date) => void
}

function YearSelect({ year, fromDate, toDate, onYearChange }: YearSelectProps): ReactElement {
    const years: Date[] = []
    const fromYear = fromDate.getFullYear()
    const toDateYear = toDate.getFullYear()
    for (let currYear = fromYear; currYear <= toDateYear; currYear++) {
        years.push(setYear(startOfYear(new Date()), currYear))
    }

    if (!years.map((x) => x.getFullYear()).includes(year.getFullYear())) {
        years.push(setYear(startOfYear(new Date()), year.getFullYear()))
    }
    years.sort((a, b) => a.getFullYear() - b.getFullYear())

    const handleButtonClick = (change: number): void => {
        const newYear = Number(year.getFullYear() + change)
        onYearChange(setYear(year, newYear))
    }

    const hasPrevYear = fromDate ? isBefore(year?.getFullYear() - 1, fromDate?.getFullYear()) : true
    const hasNextYear = toDate ? isAfter(year?.getFullYear() + 1, toDate?.getFullYear()) : true

    return (
        <div className="navds-date__caption">
            <Button
                className="navds-date__caption-button"
                disabled={hasPrevYear}
                onClick={() => handleButtonClick(-1)}
                aria-label={labelPrevYear('nb')}
                icon={<ArrowLeftIcon aria-hidden />}
                variant="tertiary"
                type="button"
            />

            <Select
                label="velg år"
                hideLabel
                value={year?.getFullYear()}
                onChange={(e) => onYearChange(setYear(startOfMonth(new Date()), Number(e.target.value)))}
                className="navds-date__caption__year"
            >
                {years.map((yearOpt) => (
                    <option key={yearOpt.getFullYear()} value={yearOpt.getFullYear()}>
                        {formatYear(yearOpt)}
                    </option>
                ))}
            </Select>
            <Button
                className="navds-date__caption-button"
                disabled={hasNextYear}
                onClick={() => handleButtonClick(1)}
                aria-label={labelNextYear('nb')}
                icon={<ArrowRightIcon aria-hidden />}
                variant="tertiary"
                type="button"
            />
        </div>
    )
}

export default QuarterPicker
