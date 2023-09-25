import './globals.css'

import type { Metadata } from 'next'
import { Decorator } from '@navikt/nav-dekoratoren-server-component'
import { ReactElement, ReactNode } from 'react'
import { logger } from '@navikt/next-logger'

export const metadata: Metadata = {
    title: 'Statistikk for sykmelder',
}

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
    logger.info('Logging from root layout (server)')

    return (
        <html lang="en">
            <Decorator
                decoratorProps={{
                    // TODO based on build env
                    env: 'prod',
                }}
            >
                {children}
            </Decorator>
        </html>
    )
}
