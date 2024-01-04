import React, { ReactElement } from 'react'
import { sub } from 'date-fns'

import { SykefravaerVarighetFilterSchema } from 'queries/sykefravaer'

import PageLayout from '../../../components/layout/page-layout'
import PageCrumbs from '../../../components/decorator/page-crumbs'
import { verifyUserLoggedIn } from '../../../auth/authentication'
import MonthYearPicker from '../../../components/filters/MonthYearPicker'
import QuarterPicker from '../../../components/filters/QuarterPicker'
import SykefravaerVarighet from '../../../components/views/sykefravaer-varighet/SykefravaerVarighet'
import TextLink from '../../../components/TextLink'
import SykefravaerVarighetFilter from '../../../components/filters/filter-sections/SykefravaerVarighetFilter'

const pagePath = '/sykefravaer/varighet'

interface Props {
    searchParams: Record<string, string>
}

async function Page({ searchParams }: Props): Promise<ReactElement> {
    await verifyUserLoggedIn(pagePath)

    return (
        <PageLayout
            title="Varighet på sykefraværstilfeller"
            description={
                <>
                    Statistikken viser lengde på sykefraværstilfeller. Et sykefraværstilfelle kan bestå av en eller
                    flere sykmeldinger. Les mer om sykefraværstilfeller i{' '}
                    <TextLink href="/om-losningen/begrepskatalog">Begrepskatalogen</TextLink>.
                </>
            }
        >
            <PageCrumbs extraCrumbs={[{ title: 'Varighet på sykefraværstilfeller', url: pagePath }]} />
            <div className="flex gap-4 my-4">
                <MonthYearPicker fromDate={new Date('1 Oct 2020')} toDate={sub(new Date(), { months: 1 })} />
                <QuarterPicker
                    fromQuarter={{
                        year: 2020,
                        quarter: 2,
                    }}
                    toQuarter={{
                        year: 2023,
                        quarter: 3,
                    }}
                />
            </div>
            <div>
                <SykefravaerVarighetFilter />
            </div>
            <SykefravaerVarighet filters={SykefravaerVarighetFilterSchema.parse(searchParams)} />
        </PageLayout>
    )
}

export default Page
