import { ReadonlyURLSearchParams } from 'next/navigation'

import { ValidRoutes } from '../components/decorator/types'

export function createUrl(pathname: ValidRoutes, params: URLSearchParams | ReadonlyURLSearchParams): string {
    const paramsString = params.toString()
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

    return `${pathname}${queryString}`
}
