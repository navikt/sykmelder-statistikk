'use client'

import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import React, { useEffect } from 'react'

import { ValidRoutes } from './types'

type Props = {
    extraCrumbs?: { title: string; url: ValidRoutes }[]
}

function PageCrumbs({ extraCrumbs }: Props): null {
    const crumbsRef = React.useRef(extraCrumbs)

    useEffect(() => {
        setBreadcrumbs([
            {
                title: 'Statistikk for sykmelder',
                url: '/',
                handleInApp: true,
            },
            ...(crumbsRef.current || []).map((crumb) => ({
                title: crumb.title,
                url: crumb.url.toString(),
                handleInApp: true,
            })),
        ])
    }, [])

    return null
}

export default PageCrumbs
