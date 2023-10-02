'use client'

import React, { ReactElement } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts'

import { indexToMonth } from '../../utils/date'

import { colors } from './colors'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
}

function RechartsLine({ data }: Props): ReactElement {
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
                <Line id="line-1" dataKey="Din praksisk" strokeWidth={3} stroke={colors[0]} isAnimationActive={false} />
                <Line
                    id="line-2"
                    dataKey="Resten av landet"
                    strokeWidth={3}
                    stroke={colors[1]}
                    isAnimationActive={false}
                />
                <Line id="line-3" dataKey="Oslo" strokeWidth={3} stroke={colors[2]} isAnimationActive={false} />
                <XAxis dataKey="index" tickFormatter={indexToMonth} />
                <YAxis strokeWidth={0}>
                    <Label position={{ x: 80, y: -16 }} spacing={69} offset={12}>
                        Prosent
                    </Label>
                </YAxis>
                <Legend />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default RechartsLine
