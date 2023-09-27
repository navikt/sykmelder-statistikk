'use client'

import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import React, { useEffect } from 'react'

type Props = {
    extraCrumbs?: { title: string; url: string }[]
}

function RscBreadcrumber({ extraCrumbs }: Props): null {
    const crumbsRef = React.useRef(extraCrumbs)

    useEffect(() => {
        setBreadcrumbs([
            {
                title: 'Statistikk for sykmelder',
                url: '/',
            },
            ...(crumbsRef.current || []),
        ])
    }, [])

    return null
}

export default RscBreadcrumber
