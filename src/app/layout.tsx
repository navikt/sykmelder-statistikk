import 'next-logger'
import './globals.css'

import type { Metadata } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import { logger } from '@navikt/next-logger'
import { DecoratorFetchProps } from '@navikt/nav-dekoratoren-moduler'

import { bundledEnv, isLocalOrDemo } from '../env'
import Resolvers from '../components/Resolvers'
import AppHeader from '../components/header/app-header'
import { Decorator } from '../decorator/decorator'
import DevTools from '../components/devtools/DevTools'

export const metadata: Metadata = {
    title: 'Statistikk for sykmelder',
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
    logger.info('Logging from root layout (server)')

    return (
        <Decorator decoratorProps={getDecoratorProps()}>
            <Resolvers>
                <AppHeader />
                <main role="main" id="maincontent" tabIndex={-1}>
                    {children}
                </main>
                {bundledEnv.runtimeEnv === 'local' && <DevTools />}
            </Resolvers>
        </Decorator>
    )
}

function getDecoratorProps(): DecoratorFetchProps {
    return {
        env: getDecoratorEnv(),
        params: {
            simple: isLocalOrDemo,
            context: 'samarbeidspartner',
            breadcrumbs: [
                {
                    title: 'Statistikk for sykmelder',
                    url: '/',
                },
            ],
        },
    }
}

function getDecoratorEnv(): 'devNext' {
    switch (bundledEnv.runtimeEnv) {
        case 'local':
        case 'test':
        case 'dev':
            return 'devNext'
        case 'demo':
        case 'prod':
            return 'devNext'
        default:
            throw new Error(`Unknown runtime environment: ${bundledEnv.runtimeEnv}`)
    }
}
