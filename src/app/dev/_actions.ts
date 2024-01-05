'use server'

import { logger } from '@navikt/next-logger'

import { dbClient } from '../../db/pg'
import { clearSchema, seedTestDatabase } from '../../db/dev/seed'

export async function reSeedDatabase(): Promise<void> {
    const client = await dbClient()

    logger.info('Clearing database')
    await clearSchema(client)

    logger.info('Re-seeding database')
    await seedTestDatabase(client)
}
