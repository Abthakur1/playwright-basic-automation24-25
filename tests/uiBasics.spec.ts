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

test('Price validation of Samsung Note 8', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator("label[class='customradio'] input").first().check();
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    const price = await page.locator('.card-body h5').nth(1).textContent();
    expect(price).toBe('$24.99');
});

test('Add all products in a list and add 1 product in checkout to validate', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator("label[class='customradio'] input").first().check();
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    const cardTitlesElement = await page.$$('.card-title>a');
    console.log(cardTitlesElement);
    for(const eachElement of cardTitlesElement) {
        const title = await eachElement.textContent();
        console.log(title);
    }
    const addButtons = await page.locator('button.btn');
    await addButtons.filter({hasText: 'Add '}).first().click();
    await expect(await page.locator('a.nav-link.btn.btn-primary')).toContainText('Checkout ( 1 )')
});
