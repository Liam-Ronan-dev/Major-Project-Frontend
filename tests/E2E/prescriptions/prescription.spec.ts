import { test, expect } from '@playwright/test';

test.describe('Prescriptions page', () => {
  test.use({ storageState: 'tests/e2e/storageState.json' });

  test('should load the prescriptions page', async ({ page }) => {
    await page.goto('/dashboard/prescriptions');

    // Wait for the Prescriptions heading
    await page.getByRole('heading', { name: 'Prescriptions' });
  });

  test('should show "Add Prescription" button for doctors', async ({
    page,
  }) => {
    await page.goto('/dashboard/prescriptions');

    await page.getByRole('link', { name: /Add Prescription/i }).click();

    await expect(page).toHaveURL(/\/dashboard\/prescriptions\/create/);

    await expect(page.getByText(/Add New Prescription/i)).toBeVisible();
  });

  test('should search for a patient by name', async ({ page }) => {
    await page.goto('/dashboard/prescriptions');

    // Confirm the page loaded by checking heading
    await expect(
      page.getByRole('heading', { name: 'Prescriptions' })
    ).toBeVisible();

    // Search for a patient (e.g., 'Liam')
    const searchInput = page.getByPlaceholder(
      'Search prescriptions by patient'
    );
    await searchInput.fill('liam');

    // Check if at least one search result with 'Liam' appears
    const patientResults = await page.locator('text=/liam/i').all();
    expect(patientResults.length).toBeGreaterThan(0);
  });
});
