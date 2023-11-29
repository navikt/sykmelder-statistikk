import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'
import SykmeldingFilter from '../../../components/filters/filter-sections/SykmeldingFilter'

const pagePath = '/sykmelding/spredning'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[{ title: 'Spredningsdiagram - Gradering av sykmeldinger', url: pagePath }]} />
            <SykmeldingFilter />
            TODO this route
        </PageLayout>
    )
}

export default Page
