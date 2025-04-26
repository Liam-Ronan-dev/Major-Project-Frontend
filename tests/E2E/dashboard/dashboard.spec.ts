import { test, expect } from '@playwright/test';

test.describe('Dashboard page', () => {
  test.use({ storageState: 'tests/e2e/storageState.json' });

  test('should load dashboard and show welcome message', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  });

  test('should allow navigating to patients page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: /Patients/i }).click();
    await expect(page).toHaveURL(/\/patients/);
    await expect(page.getByText(/Patients/i)).toBeVisible();
  });

  test('should allow navigating to prescriptions page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: /Prescriptions/i }).click();
    await expect(page).toHaveURL(/\/prescriptions/);
    await expect(page.getByText(/Prescriptions/i)).toBeVisible();
  });

  test('should allow navigating to appointments page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: /Appointments/i }).click();
    await expect(page).toHaveURL(/\/appointments/);
    await expect(page.getByText(/Appointments/i)).toBeVisible();
  });
});

test.describe('Quick Prescription button', () => {
  test.use({ storageState: 'tests/e2e/storageState.json' });

  test('should navigate to Quick Prescription page', async ({ page }) => {
    await page.goto('/dashboard');

    // Click the "Quick Prescription" button
    await page.getByRole('link', { name: /Quick Prescription/i }).click();

    // Expect to land on the quick-prescribe page
    await expect(page).toHaveURL(/\/dashboard\/prescriptions\/create/);
  });
});
