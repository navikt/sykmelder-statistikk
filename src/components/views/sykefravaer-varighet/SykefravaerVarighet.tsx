import React, { ReactElement, Suspense } from 'react'
import { Heading } from '@navikt/ds-react'

import { getSykefravaerGjennomsnittligVarighet, SykefravaerVarighetFilter } from 'queries/sykefravaer'
import { suspenseKey } from 'utils/string'

import GraphSkeleton from '../../graphs/GraphSkeleton'

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
            <Suspense key={suspenseKey(filters)} fallback={<GraphSkeleton />}>
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
