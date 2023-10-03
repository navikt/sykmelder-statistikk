import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'

const pagePath = '/diagnoser/sok'

async function Page(): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout>
            <PageCrumbs
                extraCrumbs={[
                    { title: 'Diagnoser', url: '/diagnoser' },
                    { title: 'Søk', url: pagePath },
                ]}
            />
            TODO this route
        </PageLayout>
    )
}

export default Page
