'use client'

import { ReactElement } from 'react'

import GenderSelect from './GenderSelect'
import AgeSelect from './AgeSelect'
import GradingSelect from './GradingSelect'
import OwnSharedCasesSelect from './OwnSharedCasesSelect'
function SykefravaerVarighetFilter(): ReactElement {
    return (
        <div className="flex flex-wrap mt-8 [&>div]:mr-4 [&>div]:mb-8">
            <GenderSelect />
            <AgeSelect />
            <OwnSharedCasesSelect />
            <GradingSelect />
        </div>
    )
}

export default SykefravaerVarighetFilter
