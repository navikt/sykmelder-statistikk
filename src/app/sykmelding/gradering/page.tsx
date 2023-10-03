import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'

function Page(): ReactElement {
    return (
        <PageLayout>
            <PageCrumbs
                extraCrumbs={[
                    {
                        title: 'Spredningsdiagram - Gradering av sykmeldinger',
                        url: '/sykmelding/spredning',
                    },
                ]}
            />
            TODO this route
        </PageLayout>
    )
}

export default Page
