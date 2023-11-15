import { Pool } from 'pg'
import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector'
import { lazyNextleton } from 'nextleton'
import { logger } from '@navikt/next-logger'

import { bundledEnv, getServerEnv } from '../env'

import { devDatabase } from './dev/dev-db'
import { seedTestDatabase } from './dev/seed'

export const dbClient = lazyNextleton('db', async () => {
    const pool = await getPool()
    const client = await pool.connect()
    logger.info(`Connected to database`)

    if (bundledEnv.runtimeEnv === 'local') {
        logger.info('Seeding database')
        await seedTestDatabase(client)
    }

    return client
})

async function getPool(): Promise<Pool> {
    return bundledEnv.runtimeEnv === 'local' ? getTestcontainersPool() : getProductionPool()
}

async function getProductionPool(): Promise<Pool> {
    const config = getServerEnv()

    const connector = new Connector()
    const clientOpts = await connector.getOptions({
        instanceConnectionName: 'teamsykmelding-dev-1d34:europe-north1:sykmelder-statistikk',
        ipType: IpAddressTypes.PUBLIC,
    })

    const pool = new Pool({
        ...clientOpts,
        user: config.DB_SYKMELDER_STATISTIKK_NEXT_USERNAME,
        password: config.DB_SYKMELDER_STATISTIKK_NEXT_PASSWORD,
        database: 'statistikk',
        max: 5,
    })
    return pool
}

async function getTestcontainersPool(): Promise<Pool> {
    const container = await devDatabase()

    return new Pool({
        connectionString: container.getConnectionUri(),
        max: 5,
    })
}

export async function testDb(): Promise<void> {
    const t1 = performance.now()
    const pool = await dbClient()
    const t2 = performance.now()
    logger.info(`Time to connect to db ${t2 - t1}`)

    const t3 = performance.now()
    const { rows } = await pool.query('SELECT * FROM test_table;')
    const t4 = performance.now()
    logger.info(`Time to query db ${t4 - t3}`)

    // eslint-disable-next-line no-console
    console.table(rows) // prints returned time value from server
}
