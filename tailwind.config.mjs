import naviktTailwindPreset from '@navikt/ds-tailwind'

/** @type {import('tailwindcss').Config} */
const config = {
    presets: [naviktTailwindPreset],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    plugins: [],
}

export default config
