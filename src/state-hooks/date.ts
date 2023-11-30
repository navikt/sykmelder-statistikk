import { useQueryState, UseQueryStateReturn } from 'next-usequerystate'
import { sub } from 'date-fns'
import { useTransition } from 'react'

import { parseYearMonth, parseYearQuarter, serializeMonthYear, serializeYearQuarter } from '../utils/date'

export function useMonthYearQueryState(key: string): UseQueryStateReturn<Date, Date> {
    return useQueryState(key, {
        parse: parseYearMonth,
        serialize: serializeMonthYear,
        defaultValue: sub(new Date(), { months: 1 }),
    })
}

export function useQuarterQueryState(key: string): [...UseQueryStateReturn<Date, Date>, transitionLoading: boolean] {
    const [isLoading, startTransition] = useTransition()

    return [
        ...useQueryState(key, {
            startTransition,
            parse: parseYearQuarter,
            serialize: serializeYearQuarter,
            defaultValue: sub(new Date(), { months: 3 }),
        }),
        isLoading,
    ]
}
