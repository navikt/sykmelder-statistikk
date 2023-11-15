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
        if (
            getServerEnv().runtimeEnv !== 'demo' &&
            // TODO: Temporarily don't connect to DB in production until backend is ready
            // TODO: REMEMBER TO CONFIGURE EGRESS IP IN nais/network-policy-prod.yml
            getServerEnv().runtimeEnv !== 'prod'
        ) {
            await pgPool()
        }
    } catch (e) {
        logger.error(new Error('Unable to connect pool to database :(', { cause: e }))
        return NextResponse.json({ message: 'Unable to connect pool to database :(' }, { status: 500 })
    }

    return NextResponse.json({ message: 'I am ready :)' })
}
