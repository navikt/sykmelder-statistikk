/* eslint-disable no-console */

import { DecoratorFetchProps } from '@navikt/nav-dekoratoren-moduler/ssr'

import { getDecoratorUrl } from './urls'

export async function getDecoratorMetadata(props: DecoratorFetchProps): Promise<{
    language: string
    scripts: string[]
    inlineScripts: string[]
    styles: string[]
}> {
    const url: string = getDecoratorUrl(props, 'scripts')

    console.log(`Fetching decorator metadata ${url}`)
    const response = await fetch(url, {
        next: { revalidate: 15 * 60 },
    } as RequestInit)

    return response.json()
}

export async function getDecoratorBlocks(props: DecoratorFetchProps): Promise<{ header: string; footer: string }> {
    const headerUrl: string = getDecoratorUrl(props, 'header')
    const footerUrl: string = getDecoratorUrl(props, 'footer')

    console.log('Fetching header and footer')
    const [header, footer] = await Promise.all([
        fetch(headerUrl, {
            next: { revalidate: 15 * 60 },
        } as RequestInit),
        fetch(footerUrl, {
            next: { revalidate: 15 * 60 },
        } as RequestInit),
    ])

    return {
        header: await header.text(),
        footer: await footer.text(),
    }
}
