import { format, parse, setQuarter, setYear } from 'date-fns'
import nb from 'date-fns/locale/nb'

import { capitalizeFirstLetter } from './string'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']

export function indexToMonth(index: number): string {
    return months[index]
}

export function formatMonthYear(date: Date): string {
    return capitalizeFirstLetter(format(date, 'MMMM yyyy', { locale: nb }))
}

export function formatQuarter(date: Date): string {
    return capitalizeFirstLetter(format(date, `Q. 'kvartal' yyyy`, { locale: nb }))
}

export function formatYear(year: Date): string {
    return format(year, 'yyyy', { locale: nb })
}

export function serializeMonthYear(date: Date): string {
    return format(date, 'yyyy-MM')
}

export function parseMonthYear(date: string): Date {
    return parse(date, 'yyyy-MM', new Date())
}

export function serializeYearQuarter(date: Date): string {
    return format(date, 'yyyy-QQQ')
}

export function parseYearQuarter(date: string): Date {
    return parse(date, 'yyyy-QQQ', new Date())
}

export function setYearQuarter(date: Date, year: number, quarter: number): Date {
    return setQuarter(setYear(date, year), quarter)
}
