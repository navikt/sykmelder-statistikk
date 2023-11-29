'use client'

import { ReactElement } from 'react'

import GenderSelect from './GenderSelect'
import AgeSelect from './AgeSelect'
import OwnSharedCasesSelect from './OwnSharedCasesSelect'
import AllCompletedCases from './AllCompletedCases'
function SykefravaerGraderingFilter(): ReactElement {
    return (
        <div className="flex flex-wrap mt-8 [&>div]:mr-4 [&>div]:mb-8">
            <GenderSelect />
            <AgeSelect />
            <OwnSharedCasesSelect />
            <AllCompletedCases />
        </div>
    )
}

export default SykefravaerGraderingFilter
