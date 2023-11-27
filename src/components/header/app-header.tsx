import React, { ReactElement } from 'react'
import Link from 'next/link'

import { Heading, Link as AkselLink } from 'aksel-server'
import { Button, StethoscopeIcon } from 'aksel-client'

import { ValidRoutes } from '../decorator/types'

function AppHeader(): ReactElement {
    return (
        <div className="w-full border-b-4 border-b-deepblue-400">
            <div className="container mx-auto p-8">
                <div className="flex justify-between">
                    <Button as={Link} variant="tertiary" href={'/' satisfies ValidRoutes} className="text-text-default">
                        <Heading size="xlarge" level="1" className="flex gap-4 items-center hover:underline">
                            <StethoscopeIcon />
                            Statistikk for sykmelder
                        </Heading>
                    </Button>
                    <div className="flex gap-4 justify-center items-center text-xl font-bold">
                        <AkselLink
                            prefetch={false}
                            as={Link}
                            href={'/pasientdemografi' satisfies ValidRoutes}
                            className="text-text-default"
                        >
                            Demografi
                        </AkselLink>
                        <AkselLink
                            prefetch={false}
                            as={Link}
                            href={'/om-losningen' satisfies ValidRoutes}
                            className="text-text-default"
                        >
                            Om løsningen
                        </AkselLink>
                    </div>
                </div>
                <div className="flex gap-8 my-2 ml-16">
                    <div>
                        <Heading level="2" size="small">
                            Sykefraværstilfeller
                        </Heading>
                        <ul className="flex flex-col">
                            <li>
                                <AkselLink
                                    prefetch={false}
                                    as={Link}
                                    href={'/sykefravaer/varighet' satisfies ValidRoutes}
                                >
                                    Varighet på sykefraværstilfeller
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink
                                    prefetch={false}
                                    as={Link}
                                    href={'/sykefravaer/gradering' satisfies ValidRoutes}
                                >
                                    Gradering av sykefraværstilfeller
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink
                                    prefetch={false}
                                    as={Link}
                                    href={'/sykefravaer/tilbakemelding' satisfies ValidRoutes}
                                >
                                    Tilbakemelding til NAV og Arbeidsgiver
                                </AkselLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Heading level="2" size="small">
                            Sykmeldinger
                        </Heading>
                        <ul className="flex flex-col">
                            <li>
                                <AkselLink
                                    prefetch={false}
                                    as={Link}
                                    href={'/sykmelding/varighet' satisfies ValidRoutes}
                                >
                                    Varighet på sykmeldinger
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink
                                    prefetch={false}
                                    as={Link}
                                    href={'/sykmelding/gradering' satisfies ValidRoutes}
                                >
                                    Gradering av sykmeldinger
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink
                                    prefetch={false}
                                    as={Link}
                                    href={'/sykmelding/spredning' satisfies ValidRoutes}
                                >
                                    Spredningsdiagram - Gradering av sykmeldinger
                                </AkselLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Heading level="2" size="small">
                            Diagnoser med beslutningsstøtte
                        </Heading>
                        <ul className="flex flex-col">
                            <li>
                                <AkselLink prefetch={false} as={Link} href={'/diagnoser' satisfies ValidRoutes}>
                                    Dine brukte sykmeldingsdiagnoser
                                </AkselLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHeader
