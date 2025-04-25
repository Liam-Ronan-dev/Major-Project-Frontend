import { test, expect } from '@playwright/test';
import { totp } from 'otplib';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL!;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD!;
const TEST_USER_TOTP_SECRET = process.env.TEST_USER_TOTP_SECRET!;

test.describe('Authentication', () => {
  test('Login with MFA and land on dashboard', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://health-service.click/login');

    // Fill login credentials
    await page.getByPlaceholder('name@example.com').fill(TEST_USER_EMAIL);
    await page.getByLabel('Password').fill(TEST_USER_PASSWORD);
    await page.getByRole('button', { name: /login/i }).click();

    // Wait for redirect to MFA page
    await expect(page).toHaveURL(/\/input-totp/);
    await expect(page.getByText('Enter MFA Code')).toBeVisible();

    // Generate current OTP from TOTP secret
    const currentOTP = totp.generate(TEST_USER_TOTP_SECRET);
    console.log('[DEBUG] OTP:', currentOTP);

    // Fill the OTP input (ShadCN-style using a single input group)
    await page.locator('[data-slot="input-otp"]').type(currentOTP);

    // Submit the form
    await page.getByRole('button', { name: /submit/i }).click();

    // Wait for dashboard route and welcome message
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
    await expect(page.getByText(/Welcome Back/i)).toBeVisible({
      timeout: 15000,
    });
  });
});
