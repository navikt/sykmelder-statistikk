import naviktTailwindPreset from '@navikt/ds-tailwind'

/** @type {import('tailwindcss').Config} */
const config = {
    presets: [naviktTailwindPreset],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
