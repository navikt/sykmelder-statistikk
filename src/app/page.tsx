import React, { ReactElement } from 'react'
import { logger } from '@navikt/next-logger'

import { verifyUserLoggedIn } from '../auth/authentication'
import PageLayout from '../components/layout/page-layout'
import PageCrumbs from '../components/decorator/page-crumbs'
import { GraderteSykmeldingerEvolution } from '../components/graphs/graderte-sykmeldinger-evolution/graph'

export default async function Home(): Promise<ReactElement> {
    await verifyUserLoggedIn('/')

    logger.info('Logging from page (server)')

    return (
        <PageLayout>
            <PageCrumbs extraCrumbs={[]} />
            <GraderteSykmeldingerEvolution />
        </PageLayout>
    )
}
