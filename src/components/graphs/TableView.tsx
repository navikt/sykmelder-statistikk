'use client'

import React, { ReactElement } from 'react'

import { Table } from 'aksel-client'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
}

function TableView({ data }: Props): ReactElement {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
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

export default TableView
