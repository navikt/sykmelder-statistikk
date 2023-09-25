import './globals.css'

import type { Metadata } from 'next'
import { Decorator } from '@navikt/nav-dekoratoren-server-component'
import { ReactElement, ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Statistikk for sykmelder',
}

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
    return (
        <html lang="en">
            <body>
                <Decorator
                    decoratorProps={{
                        // TODO based on build env
                        env: 'prod',
                    }}
                >
                    {children}
                </Decorator>
            </body>
        </html>
    )
}
