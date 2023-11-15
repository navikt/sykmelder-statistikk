import bundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    experimental: {
        typedRoutes: true,
        serverComponentsExternalPackages: ['@navikt/next-logger', 'next-logger', '@testcontainers/postgresql'],
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react', 'recharts'],
    },
}

export default bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig)
