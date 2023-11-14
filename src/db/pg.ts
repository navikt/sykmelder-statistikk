import { Pool } from 'pg'
import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector'
import { lazyNextleton } from 'nextleton'
import { logger } from '@navikt/next-logger'

import { getServerEnv } from '../env'

export const pgPool = lazyNextleton('db', async () => {
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

    await pool.connect()

    return pool
})

export async function testDb(): Promise<void> {
    const t1 = performance.now()
    const pool = await pgPool()
    const t2 = performance.now()
    logger.info(`Time to connect to db (already connected) ${t2 - t1}`)

    const t3 = performance.now()
    const { rows } = await pool.query('SELECT * FROM test_table;')
    const t4 = performance.now()
    logger.info(`Time to query db ${t4 - t3}`)

    // eslint-disable-next-line no-console
    console.table(rows) // prints returned time value from server
}
