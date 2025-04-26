import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL!;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD!;

async function loginAndSaveState() {
  const browser = await chromium.launch({ headless: false }); // headless false = you see the browser
  const page = await browser.newPage();

  console.log('Navigating to Login page...');
  await page.goto('https://health-service.click/login');

  // Fill credentials
  await page.getByPlaceholder('name@example.com').fill(TEST_USER_EMAIL);
  await page.getByLabel('Password').fill(TEST_USER_PASSWORD);
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for input-totp page
  await page.waitForURL(/\/input-totp/);

  console.log('Waiting for you to manually enter your TOTP...');
  console.log('You have 30 seconds to input TOTP manually.');

  await page.waitForTimeout(30000); // Give you 30 seconds to enter OTP manually

  // Confirm you are on dashboard
  await page.waitForURL(/\/dashboard/);

  console.log('Logged in successfully! Saving storage...');

  // Save storage (cookies, localStorage) to a file
  await page.context().storageState({ path: 'tests/e2e/storageState.json' });

  console.log('Storage state saved at tests/e2e/storageState.json');

  await browser.close();
}

loginAndSaveState();
