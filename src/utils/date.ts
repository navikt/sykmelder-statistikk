import { format, parse } from 'date-fns'
import nb from 'date-fns/locale/nb'

import { capitalizeFirstLetter } from './string'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']

export function indexToMonth(index: number): string {
    return months[index]
}

export function formatMonthYear(date: Date): string {
    return capitalizeFirstLetter(format(date, 'MMMM yyyy', { locale: nb }))
}

export function serializeMonthYear(date: Date): string {
    return format(date, 'yyyy-MM')
}

export function parseMonthYear(date: string): Date {
    return parse(date, 'yyyy-MM', new Date())
}
