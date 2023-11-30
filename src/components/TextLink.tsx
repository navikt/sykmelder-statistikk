import { Link, LinkProps } from '@navikt/ds-react'
import NextLink from 'next/link'
import React, { ReactElement } from 'react'

function TextLink({ href, children }: LinkProps): ReactElement {
    return (
        <Link as={NextLink} href={href} prefetch={false}>
            {children}
        </Link>
    )
}

export default TextLink
