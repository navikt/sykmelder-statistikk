'use client'

import React, { ReactElement } from 'react'
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getMonth, getQuarter, startOfQuarter } from 'date-fns'
import { Table } from '@navikt/ds-react'

import { indexToMonth, parseYearMonth } from 'utils/date'
import { SykefravaerGjennomsnittligVarighetResult } from 'queries/sykefravaer'

import { colors } from '../../graphs/colors'
import GraphWrapper from '../../graphs/GraphWrapper'
import GraphToggleGroup, { useGraphToggleGroupState } from '../../graphs/GraphToggleGroup'

type Props = {
    data: SykefravaerGjennomsnittligVarighetResult
}

function SykefravaerVarighetGraph({ data }: Props): ReactElement {
    const [value, onChange] = useGraphToggleGroupState()

    return (
        <GraphWrapper controls={<GraphToggleGroup value={value} onChange={onChange} />}>
            {value === 'graph' && <Graph data={data} />}
            {value === 'table' && <DataTable data={data} />}
        </GraphWrapper>
    )
}

function Graph({ data }: Props): ReactElement {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                id="line-chart-test"
                data={data}
                margin={{
                    top: 32,
                    right: 32,
                    left: 0,
                }}
            >
                <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="10 5" />
                <Line
                    id="line-1"
                    dataKey="antall_dager"
                    name="Antall dager"
                    strokeWidth={3}
                    stroke={colors[0]}
                    isAnimationActive={false}
                />
                <XAxis
                    dataKey="name"
                    tickFormatter={(value) => {
                        const date = parseYearMonth(value)
                        const quarter = getQuarter(date)
                        const month = getMonth(date)

                        if (getMonth(startOfQuarter(date)) === month) {
                            return `Q${quarter} ${indexToMonth(month)}`
                        }

                        return indexToMonth(month)
                    }}
                />
                <YAxis strokeWidth={0}>
                    <Label position={{ x: 90, y: -16 }} spacing={69} offset={12}>
                        Antall dager
                    </Label>
                </YAxis>
                <Legend />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

/**
 * Incomplete, just a placeholder
 */
function DataTable({ data }: Props): ReactElement {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col" colSpan={3}>
                        År
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell scope="col">3. Kvartal</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, i) => {
                    return (
                        <Table.Row key={i}>
                            <Table.HeaderCell scope="row">{JSON.stringify(row)}</Table.HeaderCell>
                            <Table.DataCell>cell</Table.DataCell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default SykefravaerVarighetGraph
