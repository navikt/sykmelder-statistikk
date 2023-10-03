'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler'

/**
 * Hook into the decorator's breadcrumbs, and use Next's router
 * instead to avoid full page loads on breadcrumb clicks
 */
export function useHandleDecoratorClicks(): void {
    const router = useRouter()

    useEffect(() => {
        onBreadcrumbClick((breadcrumb) => {
            router.push(breadcrumb.url as never)
        })
    }, [router])
}
