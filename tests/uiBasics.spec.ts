import test from '@playwright/test';

test('First playwright ui test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

})

test('First playwright ui test with page fixture', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

})