import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

interface Props {
    // TODO: Make these two non-optional
    title?: string
    description?: ReactNode
}

function PageLayout({ title, description, children }: PropsWithChildren<Props>): ReactElement {
    return (
        <div className="container mx-auto lg:p-24 lg:pt-8 p-8 pt-8">
            {title && (
                <Heading size="large" level="2" spacing>
                    {title}
                </Heading>
            )}
            {description && (
                <BodyShort className="max-w-prose" spacing>
                    {description}
                </BodyShort>
            )}
            {children}
        </div>
    )
}

export default PageLayout
