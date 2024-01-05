/* eslint-disable no-console */

import * as fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'

import * as R from 'remeda'
import { addDays, differenceInDays, formatISO } from 'date-fns'
import { PoolClient } from 'pg'
import { logger } from '@navikt/next-logger'

import { bundledEnv } from '../../env'

const changesetPaths = path.join(cwd(), 'src/db/dev/changesets')

export async function clearSchema(client: PoolClient): Promise<void> {
    if (bundledEnv.runtimeEnv !== 'local') {
        throw new Error('Can only clear schema in local environment')
    }

    logger.info('Clearing schema')
    await client.query(`
        DROP TABLE IF EXISTS sykmelding_varighet;
        DROP TABLE IF EXISTS sfs_sykmelding;
    `)
}

export async function seedTestDatabase(client: PoolClient): Promise<void> {
    const files = fs.readdirSync(changesetPaths)
    const megaChangeset = files.map((file) => fs.readFileSync(path.join(changesetPaths, file)).toString()).join('\n\n')

    logger.info('Applying changesets to test database')
    await client.query(megaChangeset)

    const fakeData = R.range(0, 2000).map((index) => ({
        pk: index,
        ar: 2023,
        mnd: 1,
        bydel: 'Oslo',
        kommune: 'Oslo',
        fylke: 'Oslo',
        sykmelder_fnr: `${index % 7}`.padEnd(9, '0'),
        hovedgruppe_kode: randomValue(hovedgruppeKode),
        undergruppe_kode: randomValue(undergruppeKode),
        samensatt_kode: randomValue(sammensattKode),
        pasient_kjonn: randomValue(['M', 'K']),
        pasient_alder: randomValue(R.range(18, 69)),
        diagnose_hovedgruppe: randomValue(diagnoseHovedgrupper),
        diagnose_undergruppe: randomValue(diagnoseUndergrupper),
        naeringsgruppe: randomValue(naeringsgrupper),
        inntektskategori: randomValue(inntektskategori),
        ...generateRandomSykmelding(2023, 1),
    }))

    const generatedQuery = `
      ${fakeData
          .map(
              (it) => `INSERT INTO sfs_sykmelding(${R.keys(it).join(',')})
                            VALUES (${R.values(it)
                                .map((it) => (typeof it === 'string' ? `'${it}'` : it))
                                .join(',')})`,
          )
          .join(';\n')}
    `

    /*
     INSERT INTO sfs_sykmelding(pk,ar,mnd,bydel,kommune,fylke,sykmelder_fnr,hovedgruppe_kode,undergruppe_kode,samensatt_kode,pasient_kjonn,pasient_alder,diagnose_hovedgruppe,diagnose_undergruppe,naeringsgruppe,inntektskategori,gradert,antall_dager,sykefravar_fom,fom,tom)
                            VALUES (0,2023,1,Oslo,Oslo,Oslo,0        ,SPES,KI,OYES,K,68,Svangerskapsrelaterte,Påvist covid-19,Varehandel, transport og lagring,AAP og dagpengemottakere,true,-11,2023-02-08,2023-02-08,2023-02-19)
     */

    console.log('First 10 lines:')
    console.log(R.take(generatedQuery.split('\n'), 10).join('\n'))

    logger.info('Inserting seed data')
    await client.query(generatedQuery)
}

function randomValue<T>(values: T[]): T {
    return values[Math.floor(Math.random() * values.length)]
}

function generateRandomSykmelding(
    year: number,
    month: number,
): {
    gradert: boolean
    antall_dager: number
    sykefravar_fom: string
    fom: string
    tom: string
} {
    const type = randomValue(['GRADERT', '100%'] as const)

    const initialDate = new Date(year, month, 1)
    const fom = addDays(initialDate, +(Math.random() * 10).toFixed(0))
    const tom = addDays(fom, +(Math.random() * 14).toFixed(0))
    const antall_dager = differenceInDays(fom, tom)

    switch (type) {
        case 'GRADERT':
            return {
                gradert: true,
                antall_dager,
                sykefravar_fom: formatISO(fom, { representation: 'date' }),
                fom: formatISO(fom, { representation: 'date' }),
                tom: formatISO(tom, { representation: 'date' }),
            }
        case '100%':
            return {
                gradert: false,
                antall_dager: randomValue(R.range(1, 14)),
                sykefravar_fom: formatISO(fom, { representation: 'date' }),
                fom: formatISO(fom, { representation: 'date' }),
                tom: formatISO(tom, { representation: 'date' }),
            }
    }
}

const hovedgruppeKode = ['ALLM', 'FTMT', 'KI', 'OVRI', 'SPES']

const undergruppeKode = [
    'ANDR',
    'ARBE',
    'FAST',
    'FODS',
    'FTMT',
    'INDR',
    'KI',
    'KIRU',
    'OREN',
    'ORTO',
    'OVRI',
    'OYES',
    'PSYK',
    'VIKA',
]

const sammensattKode = ['ALLM', 'ARBE', 'FODS', 'FTMT', 'INDR', 'KI', 'KIRU', 'OREN', 'ORTO', 'OVRI', 'OYES', 'PSYK']

const naeringsgrupper = [
    'Overnattings- og serveringsvirksomhet ',
    'Informasjon, finans, teknisk og forretningsmessig tjenesteyting ',
    'Helse- og sosialtjenester ',
    'Undervisning ',
    'Selvstendig næringsdrivende og arbeidsledige med dagpenger og frilansere o.a',
    'Off.adm., forsvar, sosialforsikring ',
    'Jordbruk, skogbruk og fiske',
    'Private tjenester ellers ',
    'Varehandel, transport og lagring',
    'Bygge- og anleggsvirksomhet, elektrisitet og renovasjon ',
    'Industri og bergverksdrift ',
]

const inntektskategori = [
    'AAP og dagpengemottakere',
    'Andre (barn, pensjonister over 69 år m.m.)',
    'Arbeidstakere',
    'Selvstendig næringsdrivende',
    'Pensjonister under 70 år',
]

const diagnoseHovedgrupper = [
    'Allmenne plager',
    'Andre diagnoser',
    'Luftveier',
    'Muskel og skjelett',
    'Psykiske lidelser',
    'Svangerskapsrelaterte',
]

const diagnoseUndergrupper = [
    'Allmenne plager',
    'Andre lidelser',
    'Andre muskel- og skjelettlidelser',
    'Andre psykiske lidelser',
    'Andre sykdommer i luftveiene',
    'Angst og depressive lidelser',
    'Engstelig for sykdom (R27) - risikopasienter for covid-19',
    'Mistenkt covid-19',
    '"Nakke, skulder, arm"',
    'Påvist covid-19',
    'Rygglidelser',
    'Svangerskapsrelaterte',
    'Sykdommer i fordøyelsesorganene',
    'Sykdommer i hjerte-karsystemet',
    'Sykdommer i nervesystemet',
]
