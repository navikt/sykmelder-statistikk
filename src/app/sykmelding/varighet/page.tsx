import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'
import SykmeldingFilter from '../../../components/filters/filter-sections/SykmeldingFilter'

const pagePath = '/sykmelding/varighet'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[{ title: 'Varighet på sykmeldinger', url: pagePath }]} />
            <SykmeldingFilter />
            TODO this route
        </PageLayout>
    )
}

export default Page
