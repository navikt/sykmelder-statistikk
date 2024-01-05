'use server'

import { revalidatePath } from 'next/cache'

import { dbClient } from '../../../db/pg'
import { clearSchema, seedTestDatabase } from '../../../db/dev/seed'

export async function reSeedDatabase(): Promise<void> {
    const client = await dbClient()

    await clearSchema(client)
    await seedTestDatabase(client)

    revalidatePath('/', 'layout')
}
