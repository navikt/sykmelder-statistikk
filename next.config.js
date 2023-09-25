/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    experimental: {
        serverComponentsExternalPackages: ['@navikt/next-logger', 'next-logger'],
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
    },
}

module.exports = nextConfig
