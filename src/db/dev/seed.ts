import * as fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'

import { PoolClient } from 'pg'
import { logger } from '@navikt/next-logger'

const changesetPaths = path.join(cwd(), 'src/db/dev/changesets')

export async function seedTestDatabase(client: PoolClient): Promise<void> {
    const files = fs.readdirSync(changesetPaths)
    const megaChangeset = files.map((file) => fs.readFileSync(path.join(changesetPaths, file)).toString()).join('\n\n')

    logger.info('Applying changesets to test database')
    await client.query('' + megaChangeset)

    logger.info('Inserting seed data')
    await client.query(`
        INSERT INTO test_table (id, text)
        VALUES ('1','test 1');
        INSERT INTO test_table (id, text)
        VALUES ('2','test 2');
        INSERT INTO test_table (id, text)
        VALUES ('3','test 3');
    `)
}
