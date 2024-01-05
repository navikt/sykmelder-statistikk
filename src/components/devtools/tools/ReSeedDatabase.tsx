'use client'

import React, { ReactElement } from 'react'
import { useFormStatus } from 'react-dom'
import { Detail, Heading } from '@navikt/ds-react'

import { Button } from 'aksel-client'

import { reSeedDatabase } from './dev-actions'

function ReSeedDatabase(): ReactElement {
    return (
        <div>
            <Heading level="2" size="medium">
                Re-seed databasen
            </Heading>
            <Detail>Dette sletter all data og setter den inn på nytt</Detail>
            <form action={reSeedDatabase}>
                <ReSeedButton />
            </form>
        </div>
    )
}

function ReSeedButton(): ReactElement {
    const { pending } = useFormStatus()

    return (
        <div>
            <Button variant="secondary" type="submit" loading={pending}>
                Re-seed database
            </Button>
        </div>
    )
}

export default ReSeedDatabase
