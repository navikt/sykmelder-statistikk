import { ReactElement } from 'react'

import { Button } from 'aksel-client'
import { Heading } from 'aksel-server'

export default function Home(): ReactElement {
    return (
        <main className="flex items-center justify-between p-24">
            <Heading size="xlarge">Statistikk for sykmelder</Heading>
            <Button>Does style work?</Button>
            <div className="bg-bg-subtle p-4">Tailwind test</div>
            <div className="bg-bg-subtle p-8">Tailwind test 2</div>
        </main>
    )
}
