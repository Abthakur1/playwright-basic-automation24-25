import test, { expect } from '@playwright/test';

test('Basic ui test for multiple elements and get texts', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    const expectedList = [
        'qwerty',
        'qwerty',
        'qwerty',
        'qwerty',
        'ZARA COAT 3',
        'ADIDAS ORIGINAL',
        'IPHONE 13 PRO',
        'qwerty'
      ]
    // await page.waitForLoadState('networkidle');
    await page.locator('div.card-body b').first().waitFor();
    const productNames = await page.locator('div.card-body b').allTextContents();
    productNames.forEach((item)=>{
        const result = expectedList.includes(item);
        expect(result).toBeTruthy;
    });
})

test('Static Dropdown', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator("label[class='customradio'] input").first().check();
    const dropdown = page.locator("select[class='form-control']");
    await dropdown.selectOption('consult');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
});

test.only('Handling multiple windows', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("a[href='https://rahulshettyacademy.com/documents-request']");
    const [multiPage] =  await Promise.all(
    [
        context.waitForEvent('page'),
        documentLink.click()   // 2 steps asynchronously
    ]
    );
    await multiPage.locator('section.page-title h1').waitFor();
    const textMsg = await multiPage.locator('section.page-title h1').textContent();
    expect(textMsg).toBe('Documents request');
    
});