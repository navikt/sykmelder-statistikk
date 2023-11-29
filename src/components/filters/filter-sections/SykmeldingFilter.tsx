'use client'

import { ReactElement } from 'react'

import GenderSelect from './GenderSelect'
import AgeSelect from './AgeSelect'
import GradingSelect from './GradingSelect'

function SykmeldingFilter(): ReactElement {
    return (
        <div className="flex flex-wrap mt-8 [&>div]:mr-4 [&>div]:mb-8">
            <GenderSelect />
            <AgeSelect />
            <GradingSelect />
        </div>
    )
}

export default SykmeldingFilter
