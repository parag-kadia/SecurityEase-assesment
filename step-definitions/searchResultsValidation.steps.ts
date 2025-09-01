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
   ;
});

When('I search for "Sport in 2023"', async function () {
    // A common locator for a search icon or button is a button with a search role.
     const search = page.getByRole('link', { name: 'Search BBC' });
     await search.click();
     // The search input field might appear after clicking the icon.
    const Text = page.getByRole('textbox', { name: 'Search news, topics and more' });
    await Text.fill('Sport in 2023');
  
    // after adding Search field click search button.
    const searchIcon = page.getByRole('button', { name: 'Search' });
    await searchIcon.click();
   
});

Then('I should see at least 4 relevant results', async function () {

    const results = page.getByTestId('newport-card');

    for (let results_count = 0; results_count < 5; results_count++) {
        await expect(results.nth(results_count)).toBeVisible();
    }
     const count = await results.count();
     expect(count).toBeGreaterThanOrEqual(4);
    // console.log(`Found ${count} search results.`);

});

