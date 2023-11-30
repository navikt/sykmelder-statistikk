import * as R from 'remeda'
import { z } from 'zod'
import { isSameQuarter } from 'date-fns'

import { getPreviousQuarter, parseYearQuarter, setYearMonth } from 'utils/date'
import { fakeWait } from 'utils/wait'

import { dbClient } from '../pg'
import { isLocalOrDemo } from '../../env'

export type SykefravaerVarighetFilter = z.infer<typeof SykefravaerVarighetFilterSchema>
export const SykefravaerVarighetFilterSchema = z.object({
    quarter: z.string().optional(),
})

export type SykefravaerGjennomsnittligVarighetResult = {
    name: string
    antall_sykmeldinger: number
    antall_dager: number
}[]

export async function getSykefravaerGjennomsnittligVarighet(
    filters: SykefravaerVarighetFilter,
): Promise<SykefravaerGjennomsnittligVarighetResult> {
    const client = await dbClient()
    const result = await client.query(`
        SELECT *
        FROM sfs_varighet_alle;
    `)

    if (isLocalOrDemo) {
        await fakeWait(2000, 500)
    }

    const yearQuarter = filters.quarter != null ? parseYearQuarter(filters.quarter) : getPreviousQuarter()

    return R.pipe(
        result.rows,
        R.map((row) => ({
            year: +row.aarmnd.slice(0, 4),
            month: +row.aarmnd.slice(4, 6) - 1,
            antall_sykmeldinger: row.antall_sykmeldinger,
            antall_dager: row.antall_dager,
            gradert: Boolean(row.gradert_flagg),
        })),
        R.filter((row) => isSameQuarter(yearQuarter, setYearMonth(new Date(), row.year, row.month))),
        R.groupBy.strict((row) => `${row.year}-${`${row.month + 1}`.padStart(2, '0')}`),
        R.mapValues((rows) => ({
            antall_sykmeldinger: R.sumBy(rows ?? [], (row) => row.antall_sykmeldinger),
            antall_dager: R.sumBy(rows ?? [], (row) => row.antall_dager),
        })),
        R.toPairs.strict,
        R.map(([name, { antall_sykmeldinger, antall_dager }]) => ({
            name,
            antall_sykmeldinger,
            antall_dager,
        })),
    )
}
