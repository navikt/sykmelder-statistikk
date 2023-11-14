import { NextResponse } from 'next/server'
import { logger } from '@navikt/next-logger'

import { getServerEnv } from '../../../../env'
import { pgPool } from '../../../../db/pg'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<NextResponse> {
    try {
        getServerEnv()
    } catch (e) {
        logger.error(new Error('Misconfigured environment variables :(', { cause: e }))
        return NextResponse.json({ message: 'Misconfigured environment variables :(' }, { status: 500 })
    }

    try {
        // No DB in demo
        if (getServerEnv().runtimeEnv !== 'demo') {
            await pgPool()
        }
    } catch (e) {
        logger.error(new Error('Unable to connect pool to database :(', { cause: e }))
        return NextResponse.json({ message: 'Unable to connect pool to database :(' }, { status: 500 })
    }

    return NextResponse.json({ message: 'I am ready :)' })
}
