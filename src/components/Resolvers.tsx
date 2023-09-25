'use client'

import { PropsWithChildren, ReactElement } from 'react'
import { configureLogger } from '@navikt/next-logger'

configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
})

function Resolvers({ children }: PropsWithChildren): ReactElement {
    return <>{children}</>
}

export default Resolvers
