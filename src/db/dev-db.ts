import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { lazyNextleton } from 'nextleton'
import { logger } from '@navikt/next-logger'
import { PoolClient } from 'pg'

export const devDatabase: () => Promise<StartedPostgreSqlContainer> = lazyNextleton('dev-testcontainers', async () => {
    logger.info('Starting dev database')

    return new PostgreSqlContainer()
        .withDatabase('statistikk')
        .withUsername('dev-user')
        .withPassword('dev-password')
        .start()
        .then((container) => {
            logger.info(`Started dev database on port ${container.getMappedPort(5432)}`)

            return container
        })
})

export async function seedTestDatabase(client: PoolClient): Promise<void> {
    await client.query(`
        CREATE TABLE IF NOT EXISTS test_table
        (
            id   SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `)

    await client.query(`
        INSERT INTO test_table (name)
        VALUES ('test');
        INSERT INTO test_table (name)
        VALUES ('test');
        INSERT INTO test_table (name)
        VALUES ('test');

    `)
}
