import { z, ZodError } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
export const publicEnvSchema = z.object({
    publicPath: z.union([z.string(), z.undefined()]),
    runtimeEnv: z.union([
        z.literal('local'),
        z.literal('test'),
        z.literal('demo'),
        z.literal('dev'),
        z.literal('prod'),
    ]),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
    // Provided my nais
    IDPORTEN_CLIENT_ID: z.string(),
    IDPORTEN_WELL_KNOWN_URL: z.string(),
    TOKEN_X_WELL_KNOWN_URL: z.string(),
    TOKEN_X_PRIVATE_JWK: z.string(),
    TOKEN_X_CLIENT_ID: z.string(),
    // Database stuff provided by nais
    DB_SYKMELDER_STATISTIKK_NEXT_USERNAME: z.string(),
    DB_SYKMELDER_STATISTIKK_NEXT_PASSWORD: z.string(),
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const bundledEnv = publicEnvSchema.parse({
    publicPath: process.env.NEXT_PUBLIC_BASE_PATH,
    runtimeEnv: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
} satisfies Record<keyof PublicEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> =>
    ({
        // Provided by nais
        TOKEN_X_CLIENT_ID: process.env.TOKEN_X_CLIENT_ID,
        TOKEN_X_PRIVATE_JWK: process.env.TOKEN_X_PRIVATE_JWK,
        TOKEN_X_WELL_KNOWN_URL: process.env.TOKEN_X_WELL_KNOWN_URL,
        IDPORTEN_CLIENT_ID: process.env.IDPORTEN_CLIENT_ID,
        IDPORTEN_WELL_KNOWN_URL: process.env.IDPORTEN_WELL_KNOWN_URL,
        // Database stuff provided by nais
        DB_SYKMELDER_STATISTIKK_NEXT_USERNAME: process.env.DB_SYKMELDER_STATISTIKK_NEXT_USERNAME,
        DB_SYKMELDER_STATISTIKK_NEXT_PASSWORD: process.env.DB_SYKMELDER_STATISTIKK_NEXT_PASSWORD,
    }) satisfies Record<keyof ServerEnv, string | undefined>

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & PublicEnv {
    try {
        return { ...serverEnvSchema.parse(getRawServerConfig()), ...publicEnvSchema.parse(bundledEnv) }
    } catch (e) {
        if (e instanceof ZodError) {
            throw new Error(
                `The following envs are missing: ${
                    e.errors
                        .filter((it) => it.message === 'Required')
                        .map((it) => it.path.join('.'))
                        .join(', ') || 'None are missing, but zod is not happy. Look at cause'
                }`,
                { cause: e },
            )
        } else {
            throw e
        }
    }
}
export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || bundledEnv.runtimeEnv === 'demo'
