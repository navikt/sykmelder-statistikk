import { PropsWithChildren, ReactElement, ReactNode } from 'react'

type Props = {
    controls: ReactNode
}

function GraphWrapper({ controls, children }: PropsWithChildren<Props>): ReactElement {
    return (
        <div>
            {controls}
            <div className="w-full aspect-video">{children}</div>
        </div>
    )
}

export default GraphWrapper
