import './globals.css'

import type { Metadata } from 'next'
import { Decorator } from '@navikt/nav-dekoratoren-server-component'
import { ReactElement, ReactNode } from 'react'
import { logger } from '@navikt/next-logger'

import { getServerEnv } from '@/env'

export const metadata: Metadata = {
    title: 'Statistikk for sykmelder',
}

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
    logger.info('Logging from root layout (server)')

    return (
        <html lang="en">
            <Decorator decoratorProps={{ env: getDecoratorEnv() }}>{children}</Decorator>
        </html>
    )
}

function getDecoratorEnv(): 'dev' | 'prod' {
    const runtimeEnv = getServerEnv().runtimeEnv
    switch (runtimeEnv) {
        case 'local':
        case 'test':
        case 'dev':
            return 'dev'
        case 'demo':
        case 'prod':
            return 'prod'
        default:
            throw new Error(`Unknown runtime environment: ${runtimeEnv}`)
    }
}
