import Link from 'next/link'

export type ValidRoutes = Parameters<typeof Link>[0]['href']
