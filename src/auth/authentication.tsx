import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateToken, getToken } from '@navikt/oasis'
import { redirect } from 'next/navigation'

import { bundledEnv, isLocalOrDemo } from '../env'

export async function verifyUserLoggedIn(returnTo: string): Promise<void> {
    logger.info('Getting headers')
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return
    }

    const redirectPath = bundledEnv.publicPath ? `${bundledEnv.publicPath}${returnTo}` : returnTo
    const token = getToken(requestHeaders)
    if (!token) {
        logger.info('Found no token, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateToken(token)
    if (!validationResult.ok) {
        if (validationResult.errorType !== 'token expired') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.error.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
        }
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }
}
