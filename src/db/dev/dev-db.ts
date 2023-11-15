import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { lazyNextleton } from 'nextleton'
import { logger } from '@navikt/next-logger'

export const devDatabase: () => Promise<StartedPostgreSqlContainer> = lazyNextleton('dev-testcontainers', async () => {
    logger.info('Starting dev database')

    return new PostgreSqlContainer()
        .withDatabase('statistikk')
        .withUsername('sykmelder-statistikk-next')
        .withPassword('dev-password')
        .start()
        .then((container) => {
            logger.info(`Started dev database on port ${container.getMappedPort(5432)}`)

            return container
        })
})
