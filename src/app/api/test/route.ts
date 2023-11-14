import { NextResponse } from 'next/server'
import { logger } from '@navikt/next-logger'

import { testDb } from '../../../db/pg'

export async function POST(): Promise<NextResponse> {
    logger.info('Trying some db stuff')

    await testDb()

    logger.info('What the heck it worked')

    return NextResponse.json({
        ok: '2k',
    })
}
