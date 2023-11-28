import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'
import MonthYearPicker from '../../../components/filters/MonthYearPicker'

const pagePath = '/sykefravaer/varighet'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[{ title: 'Varighet på sykefraværstilfeller', url: pagePath }]} />
            <MonthYearPicker />
            TODO this route
        </PageLayout>
    )
}

export default Page
