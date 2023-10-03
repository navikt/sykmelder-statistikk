'use client'

import React, { ReactElement } from 'react'
import { useSearchParams } from 'next/navigation'

import RechartsLine from '../RechartsLine'
import TableView from '../TableView'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
}

function GraphView({ data }: Props): ReactElement {
    const searchParams = useSearchParams()
    const graphView = searchParams.get('view') ?? 'graph'

    if (graphView === 'graph') {
        return <RechartsLine data={data} />
    } else {
        return <TableView data={data} />
    }
}

export default GraphView
