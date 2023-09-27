import React, { ReactElement } from 'react'

import PageLayout from '../../../components/layout/page-layout'
import RscBreadcrumber from '../../../components/decorator/rsc-breadcrumber'

function Page(): ReactElement {
    return (
        <PageLayout>
            <RscBreadcrumber
                extraCrumbs={[
                    {
                        title: 'Varighet på sykefraværstilfeller',
                        url: '/sykefravaer/varighet',
                    },
                ]}
            />
            This is sub page! TODO :)))))))))))
        </PageLayout>
    )
}

export default Page
