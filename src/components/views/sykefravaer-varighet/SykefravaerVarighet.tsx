import React, { ReactElement, Suspense } from 'react'
import { Heading } from '@navikt/ds-react'

import { Skeleton } from 'aksel-server'
import { getSykefravaerGjennomsnittligVarighet, SykefravaerVarighetFilter } from 'queries/sykefravaer'

import SykefravaerVarighetGraph from './SykefravaerVarighetGraph'

interface Props {
    filters: SykefravaerVarighetFilter
}

function SykefravaerVarighet({ filters }: Props): ReactElement {
    return (
        <div>
            <Heading size="medium" level="3" spacing>
                Varighet på sykefraværstilfeller
            </Heading>
            <div className="mb-8">TODO</div>

            <Heading size="medium" level="3" spacing>
                Utvikling i gjennomsnittlig varighet på sykefraværstilfeller (med valgt filtrering)
            </Heading>
            <Suspense key={JSON.stringify(filters)} fallback={<Skeleton height={340} variant="rectangle" />}>
                <SykefravaerGjennomsnittligVarighet filters={filters} />
            </Suspense>
        </div>
    )
}

async function SykefravaerGjennomsnittligVarighet({ filters }: Pick<Props, 'filters'>): Promise<ReactElement> {
    const data = await getSykefravaerGjennomsnittligVarighet(filters)

    return (
        <div>
            <SykefravaerVarighetGraph data={data} />
        </div>
    )
}

export default SykefravaerVarighet
