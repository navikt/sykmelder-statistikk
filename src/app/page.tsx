import React, { ReactElement } from 'react'
import { logger } from '@navikt/next-logger'

import { verifyUserLoggedIn } from '../auth/authentication'
import PageLayout from '../components/layout/page-layout'
import RscBreadcrumber from '../components/decorator/rsc-breadcrumber'
import { ExampleGraphRecharts } from '../components/graphs/example-graph-recharts'

export default async function Home(): Promise<ReactElement> {
    await verifyUserLoggedIn('/')

    logger.info('Logging from page (server)')

    return (
        <PageLayout>
            <RscBreadcrumber extraCrumbs={[]} />
            <ExampleGraphRecharts />
        </PageLayout>
    )
}
