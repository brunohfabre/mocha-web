import { test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Sign In' }).click()
})
