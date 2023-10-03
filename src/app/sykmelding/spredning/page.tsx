import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'

const pagePath = '/sykmelding/gradering'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[{ title: 'Gradering av sykmeldinger', url: pagePath }]} />
            TODO this route
        </PageLayout>
    )
}

export default Page
