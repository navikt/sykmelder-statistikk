import 'next-logger'
import './globals.css'

import type { Metadata } from 'next'
import { Decorator } from '@navikt/nav-dekoratoren-server-component'
import React, { ReactElement, ReactNode } from 'react'
import { logger } from '@navikt/next-logger'
import { DecoratorParams } from '@navikt/nav-dekoratoren-server-component/dist/common-types'

import { bundledEnv } from '../env'
import Resolvers from '../components/Resolvers'
import AppHeader from '../components/header/app-header'

export const metadata: Metadata = {
    title: 'Statistikk for sykmelder',
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
    logger.info('Logging from root layout (server)')

    return (
        <html lang="en">
            <Resolvers>
                <Decorator decoratorProps={{ env: getDecoratorEnv(), params: decoratorParams }}>
                    <AppHeader />
                    <main role="main" id="maincontent" tabIndex={-1}>
                        {children}
                    </main>
                </Decorator>
            </Resolvers>
        </html>
    )
}

const decoratorParams: DecoratorParams = {
    context: 'samarbeidspartner',
    breadcrumbs: [
        {
            title: 'Statistikk for sykmelder',
            url: '/',
        },
    ],
}

function getDecoratorEnv(): 'dev' | 'prod' {
    switch (bundledEnv.runtimeEnv) {
        case 'local':
        case 'test':
        case 'dev':
            return 'prod'
        case 'demo':
        case 'prod':
            return 'prod'
        default:
            throw new Error(`Unknown runtime environment: ${bundledEnv.runtimeEnv}`)
    }
}
