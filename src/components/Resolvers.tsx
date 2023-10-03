'use client'

import { PropsWithChildren, ReactElement } from 'react'
import { configureLogger } from '@navikt/next-logger'

import { useHandleDecoratorClicks } from './decorator/breadcrumb-hooks'

configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
})

function Resolvers({ children }: PropsWithChildren): ReactElement {
    useHandleDecoratorClicks()

    return <>{children}</>
}

export default Resolvers
