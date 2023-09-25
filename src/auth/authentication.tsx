import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateIdportenToken } from '@navikt/next-auth-wonderwall'
import { redirect } from 'next/navigation'

import { raise } from '../utils/ts'
import { bundledEnv, isLocalOrDemo } from '../env'

export async function verifyUserLoggedIn(returnTo: string): Promise<void> {
    logger.info('Getting headers')
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return
    }

    const redirectPath = bundledEnv.publicPath ? `${bundledEnv.publicPath}${returnTo}` : returnTo
    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        logger.info('Found no token, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateIdportenToken(bearerToken)
    if (validationResult !== 'valid') {
        if (validationResult.errorType !== 'EXPIRED') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
        }
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }
}

export function getToken(headers: Headers): string {
    if (isLocalOrDemo) return 'fake-token'

    return headers.get('authorization')?.replace('Bearer ', '') ?? raise('Tried to get token, but header is missing')
}
