import { NextResponse } from 'next/server'

import { getServerEnv } from '../../../../env'

export const dynamic = 'force-dynamic'

export function GET(): NextResponse {
    try {
        getServerEnv()
    } catch (e) {
        return NextResponse.json({ message: 'Misconfigured environment variables :(' }, { status: 500 })
    }

    return NextResponse.json({ message: 'I am ready :)' })
}
