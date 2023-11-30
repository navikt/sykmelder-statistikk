'use client'

import React, { ReactElement } from 'react'
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getMonth, getQuarter, startOfQuarter } from 'date-fns'

import { indexToMonth, parseYearMonth } from 'utils/date'
import { SykefravaerGjennomsnittligVarighetResult } from 'queries/sykefravaer'

import { colors } from '../../graphs/colors'

type Props = {
    data: SykefravaerGjennomsnittligVarighetResult
}

function SykefravaerVarighetGraph({ data }: Props): ReactElement {
    return (
        <ResponsiveContainer width="100%" height={340}>
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

export default SykefravaerVarighetGraph
