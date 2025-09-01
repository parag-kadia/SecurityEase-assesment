import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
require('dotenv').config();

let browser: Browser;
let page: Page;

// Using a hook to manage the browser context for all scenarios. This can be reusable and Put this into the Utils.
Given('I am on the BBC Sport homepage', async function () {
    try {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto(process.env.BASE_URL as string);
        await expect(page).toHaveURL(/sport/);
    } catch (error) {
        console.error('Failed to navigate to the homepage:', error);
        await browser.close();
        throw error;
    }
});

When('I navigate to the 2023 Las Vegas Grand Prix results page', async function () {
    
    // First, accept cookies if the banner is present
    const cookieAcceptButton = page.getByTestId('navigation').getByRole('link', { name: 'Formula' });
    if (await cookieAcceptButton.isVisible()) {
        await cookieAcceptButton.click();
    }

    // Navigate to the results section.
    await page.getByRole('link', { name: 'Results' }).click();
    await expect(page).toHaveURL(/.*\/results/);

    const table = page.getByTestId('datepicker-date-link-2023');
    if (await table.isVisible()) {
        await table.click();
    }
    const race_venue = page.getByRole('button', { name: 'Las Vegas Grand Prix, Las' });
   await expect(race_venue).toBeVisible();
    await race_venue.click();

    // Verify we are on the correct results page by checking the URL or title.
    await expect(page).toHaveTitle('Formula 1 Results & Race Reports - BBC Sport');
});

Then('I should see that Max Verstappen finished in 1st place', async function () {
    const vegasSection = page.locator('section', { hasText: 'Las Vegas Grand Prix' });
    const firstPlaceDriver = vegasSection.locator('table[aria-label="Race result"] tbody tr').nth(0).locator('td').nth(1);
    // Verify the first place driver
    await expect(firstPlaceDriver).toHaveText(/Max Verstappen/);
});

Then('I should see that George Russell finished in 2nd place', async function () {
    const vegasSection = page.locator('section', { hasText: 'Las Vegas Grand Prix' });
    const secondPlaceDriver = vegasSection.locator('table[aria-label="Race result"] tbody tr').nth(1).locator('td').nth(1);
    // Verify the 2nd place driver
    await expect(secondPlaceDriver).toHaveText(/George Russell/,{ timeout: 10000 });
    //expect(secondPlaceDriver).toHaveText(/George Russell/);
});

Then('I should see that Sergio Perez finished in 3rd place', async function () {
    const vegasSection = page.locator('section', { hasText: 'Las Vegas Grand Prix' });
    const thirdPlaceDriver = vegasSection.locator('table[aria-label="Race result"] tbody tr').nth(2).locator('td').nth(1);
    // Verify the 3rd place driver
    await expect(thirdPlaceDriver).toHaveText(/Sergio Perez/);
});


