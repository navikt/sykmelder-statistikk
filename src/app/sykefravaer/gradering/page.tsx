import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'
import SykefravaerGraderingFilter from '../../../components/filters/filter-sections/SykefravaerGraderingFilter'

const pagePath = '/sykefravaer/gradering'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[{ title: 'Gradering av sykefraværstilfeller', url: pagePath }]} />
            <SykefravaerGraderingFilter />
            TODO this route
        </PageLayout>
    )
}

export default Page
