import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
require('dotenv').config();

let browser: Browser;
let page: Page;

Given('I am on the BBC Sport Search', async function () {
    try {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto(process.env.BASE_URL as string);
        await expect(page).toHaveURL(/sport/);
    } catch (error) {
        console.error('Failed to navigate to the search page:', error);
        await browser.close();
        throw error;
    }
    page.waitForTimeout(5000)
});

When('I search for "Sport in 2023"', async function () {
    // A common locator for a search icon or button is a button with a search role.
    //await page.getByRole('link', { name: 'Search BBC' }).click();
     const search = page.getByRole('link', { name: 'Search BBC' });
     await search.click()
     page.waitForTimeout(5000)

    const Text = page.getByRole('textbox', { name: 'Search news, topics and more' });
    await Text.fill('Sport in 2023');
    page.waitForTimeout(5000)

    
    const searchIcon = page.getByRole('button', { name: 'Search' });
     page.waitForTimeout(5000)
    await searchIcon.click();

    // The search input field might appear after clicking the icon.
    // A robust locator would be a text input field with a specific name or ID.
    
   await page.waitForLoadState('networkidle');
   // await page.locator('iframe[name="offer-0-nREWt"]').contentFrame().getByRole('button', { name: 'Close modal' }).click();
});

Then('I should see at least 4 relevant results', async function () {
    // This locator is based on a common pattern for search results on BBC websites.
    // It's a heuristic and may need adjustment if the site's structure changes.

    const results = page.getByTestId('newport-card');

    for (let results_count = 0; results_count < 5; results_count++) {
        // await expect(result.nth(results_count)).toBeVisible();
        await expect(results.nth(results_count)).toBeVisible();
    }

     const count = await results.count();
     expect(count).toBeGreaterThanOrEqual(4);
    console.log(`Found ${count} search results.`);
});