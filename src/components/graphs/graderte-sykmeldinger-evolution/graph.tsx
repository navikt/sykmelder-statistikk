import * as R from 'remeda'
import React, { ReactElement, Suspense } from 'react'

import { getExampleData } from '../../../data/getExampleData'

import { Controls } from './controls'
import GraphView from './graph-view'

import { Heading, Skeleton } from 'aksel-server'

export async function GraderteSykmeldingerEvolution(): Promise<ReactElement> {
    return (
        <div>
            <Heading size="medium" level="2" spacing>
                Utvikling av andel graderte sykmeldinger
            </Heading>
            <Controls />
            <Suspense fallback={<Skeleton height={340} variant="rectangle" />}>
                <DataGraph />
            </Suspense>
        </div>
    )
}

async function DataGraph(): Promise<ReactElement> {
    const exampleData = await getExampleData()
    const rotatedData: {
        index: number
        [key: string]: number
    }[] = R.pipe(exampleData, (it) => {
        return it[0].data.map((_, index) => ({
            index,
            [it[0].region]: it[0].data[index],
            [it[1].region]: it[1].data[index],
            [it[2].region]: it[2].data[index],
        }))
    })

    return <GraphView data={rotatedData} />
}
