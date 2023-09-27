import { PropsWithChildren, ReactElement } from 'react'

function PageLayout({ children }: PropsWithChildren): ReactElement {
    return <div className="container mx-auto lg:p-24 lg:pt-8 p-8 pt-8">{children}</div>
}

export default PageLayout
