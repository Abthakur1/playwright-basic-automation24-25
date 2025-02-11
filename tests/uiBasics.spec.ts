import test, { expect } from '@playwright/test';

test('First playwright ui test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('First playwright ui test with page fixture', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator("label[class='customradio'] input").first().check();
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    const successLogin: boolean = await page.locator('a.navbar-brand').first().isVisible();
    expect(successLogin).toBeTruthy;
    const ele = page.locator("h1[class='my-4']");
    expect(await ele.textContent()).toBe('Shop Name');
    // expect(await page.locator("h1[class='my-4']")).toContainText('Shop Name');
});

test('Negative Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('incorrectUsername');
    await page.locator('#password').fill('incorrectPassword');
    await page.locator("label[class='customradio'] input").first().check();
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    console.log(errorMessage);
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});