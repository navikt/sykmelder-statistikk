import React, { ReactElement } from 'react'
import { sub } from 'date-fns'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'
import MonthYearPicker from '../../../components/filters/MonthYearPicker'
import QuarterPicker from '../../../components/filters/QuarterPicker'
import SykefravaerVarighetFilter from '../../../components/filters/filter-sections/SykefravaerVarighetFilter'

const pagePath = '/sykefravaer/varighet'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[{ title: 'Varighet på sykefraværstilfeller', url: pagePath }]} />
            <div className="flex gap-4">
                <MonthYearPicker fromDate={new Date('1 Oct 2020')} toDate={sub(new Date(), { months: 1 })} />
                <QuarterPicker
                    fromQuarter={{
                        year: 2020,
                        quarter: 2,
                    }}
                    toQuarter={{
                        year: 2023,
                        quarter: 3,
                    }}
                />
            </div>
            <SykefravaerVarighetFilter />
            TODO this route
        </PageLayout>
    )
}

export default Page
