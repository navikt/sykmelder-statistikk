'use client'

import { logger } from '@navikt/next-logger'
import { ReactElement, useEffect } from 'react'

function ClientComponent(): ReactElement {
    useEffect(() => {
        logger.info('Logging from client component')
    }, [])

    return <div>Hey</div>
}

export default ClientComponent
