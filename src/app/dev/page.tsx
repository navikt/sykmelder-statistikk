import React, { ReactElement } from 'react'
import { notFound } from 'next/navigation'

import { bundledEnv } from '../../env'
import PageLayout from '../../components/layout/page-layout'

import ReSeedButton from './_re-seed-button'
import { reSeedDatabase } from './_actions'

function DevRoute(): ReactElement {
    if (bundledEnv.runtimeEnv !== 'local') {
        return notFound()
    }

    return (
        <PageLayout>
            <form action={reSeedDatabase}>
                <ReSeedButton />
            </form>
        </PageLayout>
    )
}

export default DevRoute
