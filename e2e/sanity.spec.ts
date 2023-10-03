import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
    await page.goto('/')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Statistikk for sykmelder/)
})

test('toggle to table', async ({ page }) => {
    await page.goto('/')

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: /Utvikling av andel graderte sykmeldinger/ })).toBeVisible()

    await page.getByRole('radio', { name: /Vis som tabell/ }).click()

    // Just something temporary to see that the table is rendered
    await expect(page.getByRole('columnheader', { name: 'Navn' })).toBeVisible()
})
