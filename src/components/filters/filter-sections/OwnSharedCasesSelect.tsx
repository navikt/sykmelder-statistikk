import { ReactElement } from 'react'
import { BodyLong, BodyShort, HelpText, Select } from '@navikt/ds-react'
import { useQueryState } from 'next-usequerystate'

function OwnSharedCasesSelect(): ReactElement {
    const [ownSharedCases, setOwnSharedCases] = useQueryState('alle-egne')

    return (
        <div className="flex">
            <Select
                className="[&>div]:w-40"
                label="Egne/delte tilfeller"
                value={ownSharedCases || ''}
                onChange={(e) => setOwnSharedCases(e.target.value || null)}
                size="small"
            >
                <option value="">Alle tilfeller</option>
                <option value="egne-filfeller">Egne tilfeller</option>
            </Select>
            <HelpText className="-ml-6" title="Hva menes med egne/delte tilfeller?">
                <BodyShort className="font-bold text-center mb-4">Hva menes med egne/delte tilfeller?</BodyShort>
                <BodyLong>
                    Filtervalg egne og delte tilfeller gir alle sykefraværstilfeller hvor du har skrevet siste
                    sykmelding i perioden som vises i statistikken. Filtervalg Egne tilfeller gir de
                    sykefraværstilfellene hvor du har skrevet alle sykmeldingene i tilfellet.
                </BodyLong>
            </HelpText>
        </div>
    )
}

export default OwnSharedCasesSelect
