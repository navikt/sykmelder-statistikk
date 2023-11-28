import { useQueryState, UseQueryStateReturn } from 'next-usequerystate'
import { sub } from 'date-fns'

import { parseMonthYear, parseYearQuarter, serializeMonthYear, serializeYearQuarter } from '../utils/date'

export function useMonthYearQueryState(key: string): UseQueryStateReturn<Date, Date> {
    return useQueryState(key, {
        parse: parseMonthYear,
        serialize: serializeMonthYear,
        defaultValue: sub(new Date(), { months: 1 }),
    })
}

export function useQuarterQueryState(key: string): UseQueryStateReturn<Date, Date> {
    return useQueryState(key, {
        parse: parseYearQuarter,
        serialize: serializeYearQuarter,
        defaultValue: sub(new Date(), { months: 1 }),
    })
}
