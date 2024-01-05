'use client'

import React, { ReactElement } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from 'aksel-client'

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

export default ReSeedButton
