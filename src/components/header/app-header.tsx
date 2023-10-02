import React, { ReactElement } from 'react'
import Link from 'next/link'

import { Heading, Link as AkselLink } from 'aksel-server'
import { StethoscopeIcon } from 'aksel-client'

function AppHeader(): ReactElement {
    return (
        <div className="w-full border-b-4 border-b-deepblue-400">
            <div className="container mx-auto p-8">
                <Link href="/" className="text-text-default">
                    <Heading size="xlarge" level="1" className="flex gap-4 items-center">
                        <StethoscopeIcon />
                        Statistikk for sykmelder
                    </Heading>
                </Link>
                <div className="flex gap-8 my-2 ml-16">
                    <div>
                        <Heading level="2" size="small">
                            Sykefraværstilfeller
                        </Heading>
                        <ul className="flex flex-col">
                            <li>
                                <AkselLink as={Link} href="/sykefravaer/varighet">
                                    Varighet på sykefraværstilfeller
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink as={Link} href="/sykefravaer/gradering">
                                    Gradering av sykefraværstilfeller
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink as={Link} href="/sykefravaer/tilbakemelding">
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
                                <AkselLink as={Link} href="/sykmelding/varighet">
                                    Varighet på sykmeldinger
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink as={Link} href="/sykmelding/gradering">
                                    Gradering av sykmeldinger
                                </AkselLink>
                            </li>
                            <li>
                                <AkselLink as={Link} href="/sykmelding/spredning">
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
                                <AkselLink as={Link} href="/diagnoser">
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

/*
    Sykefraværstilfeller
        Varighet på sykefraværstilfeller
        Gradering av sykefraværstilfeller
        Tilbakemelding til NAV og Arbeidsgiver
    Sykmeldinger
        Varighet på sykmeldinger
        Gradering av sykmeldinger
        Spredningsdiagram - Gradering av sykmeldinger
    Diagnoser med beslutningsstøtte
        Dine brukte sykmeldingsdiagnoser
 */

export default AppHeader
