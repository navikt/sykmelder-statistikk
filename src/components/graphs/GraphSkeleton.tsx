import { Skeleton } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import GraphWrapper from './GraphWrapper'

function GraphSkeleton(): ReactElement {
    return (
        <GraphWrapper controls={<Skeleton className="mb-4" variant="rounded" width={269} height={32} />}>
            <Skeleton variant="rounded" height="100%" />
        </GraphWrapper>
    )
}

export default GraphSkeleton
