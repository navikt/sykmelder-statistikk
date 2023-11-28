import { useQueryState, UseQueryStateReturn } from 'next-usequerystate'
import { sub } from 'date-fns'

import { parseMonthYear, serializeMonthYear } from '../utils/date'

export function useMonthYear(key: string): UseQueryStateReturn<Date, Date> {
    return useQueryState(key, {
        parse: parseMonthYear,
        serialize: serializeMonthYear,
        defaultValue: sub(new Date(), { months: 1 }),
    })
}
