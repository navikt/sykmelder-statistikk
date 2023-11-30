import { logger } from '@navikt/next-logger'

export async function fakeWait(roughly = 1000, jitter = 300): Promise<void> {
    const ms = roughly + Math.random() * jitter
    logger.info(`Faking wait for ${roughly}ms with jitter ${jitter}ms, actually waiting ${ms.toFixed(0)}ms`)
    return new Promise((resolve) => setTimeout(resolve, ms))
}
